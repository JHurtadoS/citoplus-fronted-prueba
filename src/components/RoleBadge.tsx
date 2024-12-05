import React from 'react';
import { Badge } from '@/components/ui/badge';

interface RoleBadgeProps {
    roles: string[];
}

const roleColors: Record<string, string> = {
    Admin: 'bg-red-500 text-white',
    User: 'bg-blue-500 text-white',
    Guest: 'bg-gray-500 text-white',
};

const RoleBadge: React.FC<RoleBadgeProps> = ({ roles }) => {

    console.log(roles)

    return (
        <div className="flex gap-2">
            {roles.map((role) => {
                const colorClass = roleColors[role] || 'bg-gray-300 text-black';
                return (
                    <Badge key={role} className={colorClass}>
                        {role}
                    </Badge>
                );
            })}
        </div>
    );
};

export default RoleBadge;
