import React, { useEffect, useState } from 'react';
import LogEntry from './LogEntry.jsx';
import ReactPaginate from 'react-paginate';
import './fashion.css';

function LogList({entries, submit}) {

  if(entries === null) {
    return (
      <div className="primadoro-log-list">
        Complete Pomodoros to generate logs.
      </div>
    )
  } else {
    const entriesList = entries.map( (entry) => (
      <LogEntry entry={entry} submit={submit}/>
    ));
    return (
      <PaginatedItems itemsPerPage={20} items={entries} submit={submit}/>
    )
  }
    /*
    return (
      <div className="primadoro-log-list">
          {entries.map( (entry) => (
            <LogEntry entry={entry} submit={submit}/>
          ))}
      </div>
    )
    */
  
}

function PaginatedItems({ itemsPerPage, items, submit }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="primadoro-log-list">
          {currentItems.map( (entry) => (
            <LogEntry entry={entry} submit={submit}/>
          ))}
      </div>
      <ReactPaginate
        className="pagination-navigation"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        renderOnZeroPageCount={() => (
          <div className="primadoro-log-list">
            Complete Pomodoros to generate logs.
          </div>
        )}
      />
    </>
  );
}

export default LogList;
