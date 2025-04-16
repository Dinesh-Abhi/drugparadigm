import { Link } from 'react-router-dom';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const MODELS = [
  { id: 'protec', name: 'Protec', description: 'Basic protection model' },
  { id: 'deep-protec', name: 'DeepProtec', description: 'Advanced deep learning model' },
  { id: 'drop-modalities', name: 'Drop Modalities', description: 'Modality dropping model' },
  { id: 'adc', name: 'ADC', description: 'Antibody-drug conjugate model' },
  { id: 'deep-protec-diff', name: 'DeepProtec DiffProtec', description: 'Differential protection model' },
  { id: 'traceycles-rsm4', name: 'TraceyclesRSM4', description: 'Trace cycle analysis model' }
];

export const ModelSelection = () => {
  const { doesSessionExist } = useSessionContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MODELS.map((model) => (
        <div key={model.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
          <p className="text-gray-600 mb-4">{model.description}</p>
          {doesSessionExist ? (
            <Link
              to={`/inference/${model.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Out
            </Link>
          ) : (
            <p className="text-gray-500 text-sm">Sign in to try this model</p>
          )}
        </div>
      ))}
    </div>
  );
};