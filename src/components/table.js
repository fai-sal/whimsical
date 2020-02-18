import React from 'react';
import '../styles/table.scss';
export default function Table() {

    const renderSection = ({ name, rows }) => {

        const Tag = `t${name}`;

        return (
            <Tag>
                {rows.map(({ cells }, rowIndex) => (
                    <tr key={rowIndex}>
                        {cells.map(({ content, tag: CellTag, scope, align }, columnIndex) => {
                            return (
                                <td> {content}  </td>
                            );
                        })}
                    </tr>
                ))}
            </Tag>
        );
    }
    const Section = renderSection;
    const head = [
        {
            cells: [
                { content: "col1", tag: "th" },
                { content: "col2", tag: "th" },
                { content: "col3", tag: "th" },
            ]

        }
    ],
        body = [
            {
                cells: [
                    { content: "zero one", tag: "td" },
                    { content: "zero two", tag: "td" },
                    { content: "zero three", tag: "td" }
                ]
            },
            {
                cells: [
                    { content: "one", tag: "td" },
                    { content: "two", tag: "td" },
                    { content: "three", tag: "td" }
                ]
            },

        ],
        foot = [];
    return (
        <table className="baithok-table">
            <Section name="head" rows={head} />
            <Section name="body" rows={body} />
            <Section name="foot" rows={foot} />
        </table>
    )
}