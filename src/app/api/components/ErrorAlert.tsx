interface ErrorAlertProps {
    message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
    if (!message) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm text-center">{message}</p>
        </div>
    );
}