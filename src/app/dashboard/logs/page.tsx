import LogTable from '@/components/LogTable';

export default function LogsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Logs</h1>
            </div>
            <LogTable />
        </div>
    );
}
