import { useEffect, useState } from 'react';
import { getStepRecords, addStepRecord } from '../services/api';
import StepChart from './StepChart';
import { useDispatch } from 'react-redux';
import { setStepRecords } from '../services/stepRecordsSlice';

const Stepsrecords = () => {
    const dispatch = useDispatch()
    const [stepRecords, setStepRecordsState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stepsInput, setStepsInput] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStepRecords = async () => {
            setLoading(true);
            try {
                const data = await getStepRecords();
                dispatch(setStepRecords(data))
                setStepRecordsState(data);
            } catch (err) {
                setError("Failed to fetch step records.");
            }
            setLoading(false);
        };
        fetchStepRecords();
    }, []); // Empty array means this effect runs once when the component mounts

    const handleStepsChange = (e) => {
        setStepsInput(e.target.value);
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stepsInput || !weight) {
            setError('Please fill in both fields');
            return;
        }

        try {
            await addStepRecord({ steps: stepsInput, weight });
            setStepsInput('');
            setWeight('');
            setError(null);

            // Fetch the updated step records after adding a new one
            const updatedRecords = await getStepRecords();
            dispatch(setStepRecords(data))
            setStepRecordsState(data);
            setStepRecordsState(updatedRecords);
        } catch (err) {
            setError("Failed to add step record.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Your Step Records</h1>

            {/* Manual Input for Steps */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div>
                    <label className="block text-lg font-medium mb-2">Steps:</label>
                    <input
                        type="number"
                        value={stepsInput}
                        onChange={handleStepsChange}
                        className="border rounded p-2 w-full mb-4"
                        placeholder="Enter steps"
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium mb-2">Weight (kg):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={handleWeightChange}
                        className="border rounded p-2 w-full mb-4"
                        placeholder="Enter your weight"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Step Record
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(stepRecords) && stepRecords.length > 0 ? (
                    <StepChart stepRecords={stepRecords} />
                ) : (
                    <p>No step records found.</p>
                )}
            </div>
        </div>
    );
};

export default Stepsrecords;