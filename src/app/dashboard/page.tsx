import CreateUserDialog from '@/components/forms/CreateUserForm';
import UserTable from '@/components/UserTable';

export default function DashboardPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Usuarios</h1>
                <CreateUserDialog />
            </div>
            <UserTable />
        </div>
    );
}
