import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { collegeListAPI } from "../services/api";
import {
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  Bars3Icon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const CollegeList = () => {
  const [collegeList, setCollegeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    fetchCollegeList();
  }, []);

  const fetchCollegeList = async () => {
    try {
      setLoading(true);
      const data = await collegeListAPI.getCollegeList();
      console.log("College list data:", data);
      setCollegeList(data.colleges || []);
    } catch (err) {
      console.error("Error fetching college list:", err);
      setError(err.message || "Failed to fetch college list");
      toast.error(err.message || "Failed to fetch college list");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollege = async (collegeId, branch) => {
    try {
      await collegeListAPI.removeCollegeFromList(collegeId, branch);
      setCollegeList((prev) =>
        prev.filter(
          (item) => {
            const itemCollegeId = item.college.code || item.college._id;
            return !(itemCollegeId === collegeId && item.branch === branch);
          }
        )
      );
      toast.success("College removed from your list");
    } catch (err) {
      console.error("Error removing college:", err);
      toast.error(err.message || "Failed to remove college from list");
    }
  };

  const handleClearList = () => {
    setShowClearModal(true);
  };

  const confirmClearList = async () => {
    try {
      await collegeListAPI.clearCollegeList();
      setCollegeList([]);
      toast.success("College list cleared");
    } catch (err) {
      console.error("Error clearing list:", err);
      toast.error(err.message || "Failed to clear college list");
    } finally {
      setShowClearModal(false);
    }
  };

  const handleDragEnd = async (result) => {
    // Check if item was dropped outside the list
    if (!result.destination) {
      console.log("Item dropped outside the list");
      return;
    }

    // If item was dropped in the same position, do nothing
    if (result.source.index === result.destination.index) {
      console.log("Item dropped in the same position");
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Get the item that was dragged
    const draggedItem = collegeList[sourceIndex];
    console.log("Dragged item:", draggedItem);

    // Calculate the new rank (destinationIndex + 1 because ranks start from 1)
    const newRank = destinationIndex + 1;

    // Update rank in backend first
    try {
      // Get the college code from the college object
      const collegeCode = draggedItem.college.code || draggedItem.college._id;
      console.log(
        "Updating rank for college:",
        collegeCode,
        "branch:",
        draggedItem.branch,
        "from rank:",
        draggedItem.rank,
        "to rank:",
        newRank
      );
      
      await collegeListAPI.updateCollegeRank(
        collegeCode,
        draggedItem.branch,
        newRank
      );

      // After successful backend update, update the UI
      const newCollegeList = Array.from(collegeList);
      const [movedItem] = newCollegeList.splice(sourceIndex, 1);
      newCollegeList.splice(destinationIndex, 0, movedItem);

      // Update ranks in the new list
      const updatedList = newCollegeList.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));

      // Update state
      setCollegeList(updatedList);

      toast.success("College rank updated successfully", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } catch (err) {
      console.error("Error updating college rank:", err);
      toast.error(err.message || "Failed to update college rank");
      // Revert to original state by fetching from server
      await fetchCollegeList();
    }
  };

  // Export functions
  const prepareExportData = () => {
    return collegeList.map((item, index) => ({
      Rank: index + 1,
      "College Name": item.college.name,
      Branch: item.branch,
      City: item.college.location?.city || "N/A",
      State: item.college.location?.state || "N/A",
      Type: item.college.type,
      Category: item.category,
      "Cutoff Percentile": item.cutoffPercentile?.toFixed(2) || "N/A",
    }));
  };

  const exportToExcel = () => {
    try {
      const data = prepareExportData();
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Set column widths
      const columnWidths = [
        { wch: 6 }, // Rank
        { wch: 40 }, // College Name
        { wch: 30 }, // Branch
        { wch: 15 }, // City
        { wch: 15 }, // State
        { wch: 12 }, // Type
        { wch: 12 }, // Category
        { wch: 18 }, // Cutoff Percentile
      ];
      worksheet["!cols"] = columnWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "My College List");

      const fileName = `My_College_List_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success("Excel file downloaded successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setShowExportMenu(false);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export to Excel");
    }
  };

  const exportToCSV = () => {
    try {
      const data = prepareExportData();
      const worksheet = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `My_College_List_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV file downloaded successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setShowExportMenu(false);
    } catch (error) {
      console.error("Error exporting to CSV:", error);
      toast.error("Failed to export to CSV");
    }
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(79, 70, 229); // Indigo color
      doc.text("My College List", 14, 20);

      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

      // Prepare table data
      const tableData = collegeList.map((item, index) => [
        index + 1,
        item.college.name,
        item.branch,
        `${item.college.location?.city || "N/A"}, ${
          item.college.location?.state || "N/A"
        }`,
        item.college.type,
        item.category,
        item.cutoffPercentile?.toFixed(2) || "N/A",
      ]);

      // Add table using autoTable
      autoTable(doc, {
        head: [
          [
            "Rank",
            "College Name",
            "Branch",
            "Location",
            "Type",
            "Category",
            "Cutoff %",
          ],
        ],
        body: tableData,
        startY: 35,
        theme: "striped",
        headStyles: {
          fillColor: [79, 70, 229], // Indigo color
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 12 }, // Rank
          1: { cellWidth: 50 }, // College Name
          2: { cellWidth: 40 }, // Branch
          3: { cellWidth: 35 }, // Location
          4: { cellWidth: 18 }, // Type
          5: { cellWidth: 18 }, // Category
          6: { cellWidth: 18 }, // Cutoff
        },
      });

      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
      }

      const fileName = `My_College_List_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(fileName);

      toast.success("PDF file downloaded successfully!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setShowExportMenu(false);
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      toast.error("Failed to export to PDF");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchCollegeList}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-gray-900">
                My College List
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Your personalized list of colleges for CAP round allotment
              </p>
            </div>
            {collegeList.length > 0 && (
              <div className="flex gap-3">
                {/* Export Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                    Export List
                    <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" />
                  </button>

                  {showExportMenu && (
                    <>
                      {/* Backdrop to close menu */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowExportMenu(false)}
                      />

                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1" role="menu">
                          <button
                            onClick={exportToExcel}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                            role="menuitem"
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L13 1.586A2 2 0 0011.586 1H9z" />
                            </svg>
                            <div>
                              <div className="font-medium">Excel (.xlsx)</div>
                              <div className="text-xs text-gray-500">
                                Best for spreadsheets
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={exportToCSV}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                            role="menuitem"
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <div className="font-medium">CSV (.csv)</div>
                              <div className="text-xs text-gray-500">
                                Universal format
                              </div>
                            </div>
                          </button>

                          <button
                            onClick={exportToPDF}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                            role="menuitem"
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <div className="font-medium">PDF (.pdf)</div>
                              <div className="text-xs text-gray-500">
                                Best for printing
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={handleClearList}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="-ml-1 mr-2 h-5 w-5" />
                  Clear List
                </button>
              </div>
            )}
          </div>
        </header>

        {collegeList.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="collegeList">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`${
                      snapshot.isDraggingOver ? "bg-indigo-50/30" : ""
                    } transition-colors duration-200`}
                  >
                    {collegeList.map((item, index) => (
                      <Draggable
                        key={`${item.college.code || item.college._id}-${item.branch}`}
                        draggableId={`${item.college.code || item.college._id}-${item.branch}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-6 transition-all duration-200 border-b border-gray-200 last:border-b-0 ${
                              snapshot.isDragging
                                ? "bg-indigo-50 shadow-2xl scale-105 rotate-2 z-50"
                                : "hover:bg-gray-50"
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              cursor: snapshot.isDragging ? "grabbing" : "grab",
                            }}
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 mr-3 text-gray-400 hover:text-gray-600 transition-colors">
                                <Bars3Icon className="h-6 w-6" />
                              </div>
                              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-800 font-bold mr-4">
                                {item.rank}
                              </div>
                              <div className="flex-grow">
                                <h4 className="text-lg font-bold text-indigo-700">
                                  {item.college.name}
                                </h4>
                                <p className="text-gray-600">
                                  {item.branch} &bull;{" "}
                                  {item.college.location?.city},{" "}
                                  {item.college.location?.state}
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {item.college.type}
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500">
                                    Cutoff:{" "}
                                    <span className="font-semibold">
                                      {item.cutoffPercentile?.toFixed(2) ||
                                        "N/A"}
                                      %
                                    </span>
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500">
                                    Category:{" "}
                                    <span className="font-semibold">
                                      {item.category}
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  onClick={() =>
                                    handleRemoveCollege(
                                      item.college.code || item.college._id,
                                      item.branch
                                    )
                                  }
                                  className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Total colleges in your list:{" "}
                  <span className="font-semibold">{collegeList.length}</span>
                </p>
                <button
                  onClick={fetchCollegeList}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <PlusIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-xl font-bold text-gray-900">
              Your college list is empty
            </h3>
            <p className="mt-1 text-gray-500">
              Start adding colleges from the prediction results to create your
              personalized list.
            </p>
            <div className="mt-6">
              <Link
                to="/predict"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Find Colleges
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Clear List Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Clear Entire List?
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to clear your entire college list? All {collegeList.length} saved {collegeList.length === 1 ? 'college' : 'colleges'} will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearList}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeList;
