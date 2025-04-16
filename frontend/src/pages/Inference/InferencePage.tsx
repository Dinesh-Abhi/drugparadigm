import { useParams } from 'react-router-dom';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const MODELS = [
  { id: 'protec', name: 'Protec', description: 'Basic protection model' },
  // ... other models same as before
];

export const InferencePage = () => {
  const { modelId } = useParams();
  const { doesSessionExist } = useSessionContext();
  const model = MODELS.find(m => m.id === modelId);

  if (!model) return <div>Model not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{model.name} Inference</h2>
      <p className="text-gray-600 mb-6">{model.description}</p>
      
      {doesSessionExist ? (
        <div className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Enter input data..."
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Run Inference
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please sign in to use this model</p>
          <Link
            to="/auth"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};