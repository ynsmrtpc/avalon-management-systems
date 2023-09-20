import React from "react";

export default function Table({theadContent, tbodyContent, tfoot}) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>{theadContent}</tr>
                    </thead>
                    <tbody>
                    {tbodyContent}
                    </tbody>
                    {tfoot && (
                        <tfoot>
                        <tr>{tfoot}</tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </>
    );
}
