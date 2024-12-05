
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';


const LogDetails = ({ json }: { json: string }) => {
    return (
        <div className="p-2 border rounded bg-gray-50">
            <JsonView
                data={json} shouldExpandNode={allExpanded} style={defaultStyles}
            />
        </div>
    );
};

export default LogDetails;
