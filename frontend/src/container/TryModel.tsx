import { useState, useEffect } from 'react';
import { RefreshCw, Info, Send, ArrowLeft, ChevronRight, Download, PlusCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Tooltip } from 'antd';
import modelsList from '../data/modelwise.json';

interface ModelData {
    name: string;
    version: string;
    description: string;
    details: string;
    color: string;
    icon: string;
    features: string[];
    docs?: {
        title: string;
        description: string;
    }[];
    inputType: 'single' | 'multiple';
    outputType: 'text' | '3D';
    inputFields?: {
        name: string;
        label: string;
        placeholder: string;
    }[];
}


interface InputValue {
    id: string;
    fieldName: string;
    label: string;
    value: string;
    placeholder: string;
}

export default function ModelDetail() {
    const navigate = useNavigate();
    const { modelId } = useParams<{ modelId: string }>();
    const [input, setInput] = useState('');
    const [dynamicInputs, setDynamicInputs] = useState<InputValue[]>([]);
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [modelData, setModelData] = useState<ModelData | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [show3DView, setShow3DView] = useState(false);
    const [availableFields, setAvailableFields] = useState<{name: string; label: string; placeholder: string}[]>([]);

    // Sample model data - in a real app this would come from an API or context
    useEffect(() => {
        setIsModelLoading(true);
        setTimeout(() => {
            if (modelId && modelId in modelsList) {
                const model = modelsList[modelId as keyof typeof modelsList] as ModelData;
                setModelData(model);
                
                // Initialize with a single input field for multiple input models
                if (model.inputType === 'multiple' && model.inputFields) {
                    setAvailableFields(model.inputFields);
                    // Start with the first field only
                    const firstField = model.inputFields[0];
                    setDynamicInputs([{
                        id: `input-${Date.now()}`,
                        fieldName: firstField.name,
                        label: firstField.label,
                        value: '',
                        placeholder: firstField.placeholder
                    }]);
                }
                
                // Reset 3D view
                setShow3DView(false);
            }
            setIsModelLoading(false);
        }, 800);
    }, [modelId]);

    useEffect(() => {
        // Welcome animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 2000);
    }, [modelId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleDynamicInputChange = (id: string, value: string) => {
        setDynamicInputs(inputs => 
            inputs.map(input => 
                input.id === id ? { ...input, value } : input
            )
        );
    };

    const handleSelectFieldType = (id: string, fieldName: string) => {
        const selectedField = availableFields.find(field => field.name === fieldName);
        if (selectedField) {
            setDynamicInputs(inputs => 
                inputs.map(input => 
                    input.id === id ? { 
                        ...input, 
                        fieldName: selectedField.name,
                        label: selectedField.label,
                        placeholder: selectedField.placeholder
                    } : input
                )
            );
        }
    };

    const addInputField = () => {
        // Only add if there are available fields not yet included
        const usedFieldNames = new Set(dynamicInputs.map(input => input.fieldName));
        const remainingFields = availableFields.filter(field => !usedFieldNames.has(field.name));
        
        if (remainingFields.length > 0) {
            const nextField = remainingFields[0];
            setDynamicInputs([
                ...dynamicInputs,
                {
                    id: `input-${Date.now()}`,
                    fieldName: nextField.name,
                    label: nextField.label,
                    value: '',
                    placeholder: nextField.placeholder
                }
            ]);
        }
    };

    const removeInputField = (id: string) => {
        setDynamicInputs(inputs => inputs.filter(input => input.id !== id));
    };

    const handleSubmit = () => {
        if (modelData?.inputType === 'single' && !input.trim()) return;
        if (modelData?.inputType === 'multiple' && dynamicInputs.every(input => !input.value.trim())) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (modelData?.outputType === 'text') {
                // For single input
                if (modelData.inputType === 'single') {
                    setOutput(`${modelData.name} analysis for "${input}"\nPROT-A-73X-COMPLEX\nSEQ-BINDING-DOMAIN-${Math.random().toString(36).substring(2, 10)}`);
                } 
                // For multiple inputs
                else {
                    const inputValues = dynamicInputs.reduce((acc, curr) => {
                        acc[curr.fieldName] = curr.value;
                        return acc;
                    }, {} as Record<string, string>);
                    
                    setOutput(`${modelData.name} analysis for inputs:\n${
                        dynamicInputs.map(input => `${input.label}: ${input.value}`).join('\n')
                    }\n\nPROT-A-73X-COMPLEX\nSEQ-BINDING-DOMAIN-${Math.random().toString(36).substring(2, 10)}`);
                }
            } else if (modelData?.outputType === '3D') {
                // For 3D output
                setShow3DView(true);
                setOutput('3D_MODEL_DATA_' + Math.random().toString(36).substring(2, 15));
            }
            setIsLoading(false);
        }, 1500);
    };

    if (isModelLoading) {
        return (
            <div className="max-w-4xl mx-auto p-6 mt-16 text-center">
                <Spin size="large" tip="Loading model data..." />
            </div>
        );
    }

    if (!modelData) {
        return (
            <div className="max-w-7xl mx-auto p-6 mt-16 text-center">
                <p className="text-gray-700 dark:text-gray-300">Model not found</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition border border-purple-200 dark:border-purple-800 shadow-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Models
                </button>
            </div>
        );
    }

    // Calculate fields that are available to add
    const usedFieldNames = new Set(dynamicInputs.map(input => input.fieldName));
    const canAddMoreFields = modelData.inputType === 'multiple' && 
                            modelData.inputFields &&
                            usedFieldNames.size < modelData.inputFields.length;

    return (
        <div className="max-w-7xl mx-auto p-6 mt-16 space-y-6">
            {/* Back navigation button */}
            <div className="mb-4 w-full text-left">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition border border-purple-200 dark:border-purple-800 shadow-sm"
                >
                    <ArrowLeft size={16} />
                    Back to Models
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Model Info Card */}
                <div className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-500 flex-1 ${isAnimating ? 'scale-102 shadow-2xl' : ''}`}>
                    <div className={`${modelData.color} p-6 text-white`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                                {modelData.icon}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">{modelData.name}</h1>
                                {modelData.version && (
                                    <div className="text-white/80 text-sm">Version: {modelData.version}</div>
                                )}
                            </div>
                        </div>
                        <p className="text-white/90 mb-4">{modelData.description}</p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 border-t border-white/10">
                        {modelData.details && (
                            <div className="text-gray-700 dark:text-gray-300 mb-6">{modelData.details}</div>
                        )}
                        {modelData.features?.length > 0 && (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Key Features</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {modelData.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                                        >
                                            <ChevronRight size={16} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>

                {/* Conditionally Render Documentation Section */}
                {modelData?.docs && modelData.docs.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex-1">
                        <div className="border-b border-gray-100 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-300">📚</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Documentation & Resources</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modelData.docs?.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition cursor-pointer"
                                    >
                                        <h3 className="font-medium text-gray-800 dark:text-white mb-2">{doc.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{doc.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Try Model Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                <span className="text-purple-600 dark:text-purple-300">⌘</span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Try {modelData.name}</h2>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                onClick={() => {
                                    setInput('');
                                    setDynamicInputs(dynamicInputs.map(input => ({...input, value: ''})));
                                    setOutput('');
                                    setShow3DView(false);
                                }}
                            >
                                <RefreshCw size={18} />
                            </button>
                            <Tooltip 
                                title={
                                    modelData.inputType === 'multiple' ? 
                                    "This model requires multiple input fields. Click the '+' button to add more input fields as needed." : 
                                    "Enter your input in the field below."
                                }
                            >
                                <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                                    <Info size={18} />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <div className="space-y-4">
                            {/* Single Input Field */}
                            {modelData.inputType === 'single' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Input:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={handleInputChange}
                                            placeholder="Enter protein sequence or identifier"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white transition"
                                        />
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                            className="absolute right-2 top-2 p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 transition"
                                        >
                                            {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Dynamic Multiple Input Fields */}
                            {modelData.inputType === 'multiple' && modelData.inputFields && (
                                <div className="space-y-4">
                                    {/* Title with tooltip */}
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Input Parameters:
                                        </div>
                                        <Tooltip title={`Add parameters as needed for ${modelData.name}. Different parameters let you customize the model's behavior.`}>
                                            <Info size={16} className="text-gray-500 dark:text-gray-400" />
                                        </Tooltip>
                                    </div>

                                    {/* Dynamic input fields */}
                                    {dynamicInputs.map((inputField, index) => (
                                        <div key={inputField.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-2">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {inputField.label}:
                                                </label>
                                                
                                                {dynamicInputs.length > 1 && (
                                                    <button 
                                                        onClick={() => removeInputField(inputField.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {/* If we have multiple field options, show a dropdown to select field type */}
                                            {modelData?.inputFields && modelData?.inputFields?.length > 1 && (
                                                <div className="mb-2">
                                                    <select 
                                                        value={inputField.fieldName} 
                                                        onChange={(e) => handleSelectFieldType(inputField.id, e.target.value)}
                                                        className="block w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md text-sm dark:bg-gray-800 dark:text-white transition"
                                                    >
                                                        {modelData.inputFields?.map((field) => (
                                                            <option key={field.name} value={field.name}>
                                                                {field.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            
                                            <input
                                                type="text"
                                                value={inputField.value}
                                                onChange={(e) => handleDynamicInputChange(inputField.id, e.target.value)}
                                                placeholder={inputField.placeholder}
                                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white transition"
                                            />
                                        </div>
                                    ))}

                                    {/* Add new input field button */}
                                    {canAddMoreFields && (
                                        <button
                                            onClick={addInputField}
                                            className="mt-2 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition border border-purple-200 dark:border-purple-700"
                                        >
                                            <PlusCircle size={16} />
                                            Add Parameter
                                        </button>
                                    )}

                                    {/* Submit button */}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition flex items-center gap-2"
                                        >
                                            {isLoading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                                            Process
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Output Section based on output type */}
                            {modelData.outputType === 'text' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Output:
                                    </label>
                                    <div className={`h-32 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isLoading ? 'animate-pulse' : ''}`}>
                                        {isLoading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <Spin tip={`Processing with ${modelData.name}...`} />
                                            </div>
                                        ) : output ? (
                                            <pre className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap font-mono">{output}</pre>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {modelData.inputType === 'single' 
                                                        ? "Enter a protein sequence to see results" 
                                                        : "Fill in the required fields to generate results"}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                // 3D Output Section 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        3D Structure Output:
                                    </label>
                                    <div className={`h-80 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${isLoading ? 'animate-pulse' : ''}`}>
                                        {isLoading ? (
                                            <div className="flex items-center justify-center h-full">
                                                <Spin tip={`Processing with ${modelData.name}...`} />
                                            </div>
                                        ) : show3DView ? (
                                            <div className="w-full h-full">
                                                {/* Placeholder for 3D viewer */}
                                                <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-lg flex flex-col items-center justify-center">
                                                    <div className="text-center mb-4">
                                                        <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-2">
                                                            3D Structure Visualization
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            Model ID: {output}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Simulated 3D view */}
                                                    <div className="w-3/4 h-2/3 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                                        <div className="text-gray-500 dark:text-gray-400">
                                                            <div className="text-center">
                                                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                                    <span className="text-blue-600 dark:text-blue-300 text-2xl">🧬</span>
                                                                </div>
                                                                <p>3D structure visualization</p>
                                                                <p className="text-xs mt-1">(Interactive viewer would appear here)</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Download options */}
                                                    <div className="mt-4 flex gap-2">
                                                        <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded flex items-center gap-1 text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition">
                                                            <Download size={14} />
                                                            Download PDB
                                                        </button>
                                                        <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded flex items-center gap-1 text-sm hover:bg-green-200 dark:hover:bg-green-800 transition">
                                                            <Download size={14} />
                                                            Download MOL2
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    Fill in the required fields to generate 3D structure
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}