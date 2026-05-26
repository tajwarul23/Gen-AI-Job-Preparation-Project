import { createContext, useState, useMemo } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);
    const [reports, setReports] = useState([]);

    const value = useMemo(() => ({
        loading,
        setLoading,
        report,
        setReport,
        error,
        setError,
        reports,
        setReports
    }), [loading, report, error, reports]);

    return (
        <InterviewContext.Provider value={value}>
            {children}
        </InterviewContext.Provider>
    );
};