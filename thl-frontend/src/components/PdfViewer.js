import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

const pdfViewer = ( { pdf } ) => {

    const [numPages, setNumPages] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    return(
        <div>
            <div className="controls">
                <button onClick={prevPage} disabled={pageNumber === 1}>
          Prev
                </button>
                <button onClick={nextPage} disabled={pageNumber === numPages}>
          Next
                </button>
            </div>
            <Document
                file={pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                onContextMenu={(e) => e.preventDefault()}
            >
                <Page
                    pageNumber={pageNumber} />
                <p>Page {pageNumber} of {numPages}</p>
            </Document>
        </div>
    )
}

export default pdfViewer