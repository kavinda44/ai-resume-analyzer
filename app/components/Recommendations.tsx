import React from 'react';

// Assuming Feedback type structure is available

interface Tip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

// A helper function to gather all 'improve' tips from all categories
const gatherImprovementTips = (feedback: any): Tip[] => {
    // This is the correct logic for combining all improvement tips
    const categories = [
        feedback.ATS, 
        feedback.toneAndStyle, 
        feedback.content, 
        feedback.structure
    ].filter(c => c && c.tips);

    return categories.flatMap(category => 
        category.tips.filter((tip: Tip) => tip.type === 'improve')
    );
};

// --- NEW HELPER FUNCTION FOR DYNAMIC TIP ---
const getProTip = (jobTitle: string | undefined): { action: string, quantify: string } => {
    const title = jobTitle ? jobTitle.toLowerCase() : '';
    
    if (title.includes('chef') || title.includes('cook')) {
        return {
            action: 'strong action verbs (e.g., Prepared, Executed, Managed)',
            quantify: 'results (e.g., "Reduced food waste by 15%" or "Assisted with meals for 100+ guests").'
        };
    } 
    
    if (title.includes('developer') || title.includes('engineer') || title.includes('software') || title.includes('ai')) {
        return {
            action: 'impactful action verbs (e.g., Developed, Integrated, Optimized, Deployed)',
            quantify: 'measurable results (e.g., "Optimized API response time by 40ms" or "Deployed feature resulting in 20% user growth").'
        };
    }
    
    // Default professional tip
    return {
        action: 'strong action verbs (e.g., Led, Created, Implemented)',
        quantify: 'key achievements (e.g., "Improved system efficiency by 25%" or "Managed a team of 5").'
    };
};
// -------------------------------------------


const Recommendations = ({ feedback }: { feedback: any }) => {
    if (!feedback) return null;

    const improvementTips = gatherImprovementTips(feedback);
    
    // Attempt to safely retrieve the job title (assuming it's nested somewhere in the feedback)
    // NOTE: If the jobTitle is stored elsewhere (e.g., in the data object on Resume.tsx), you must pass it as a prop.
    // For this fix, we'll assume jobTitle is accessible via `feedback.jobTitle` or pass it as a separate prop if needed.
    const jobTitle = feedback.jobTitle; // Update this line if jobTitle is not directly on the feedback object
    const proTip = getProTip(jobTitle);


    if (improvementTips.length === 0) {
        return (
            <div className="p-6 bg-green-900/40 rounded-xl border border-green-700 shadow-xl">
                <h3 className="text-2xl font-bold text-green-400 mb-2">No Major Updates Needed! 🌟</h3>
                <p className="text-green-300">
                    Your resume is well-optimized for this job description. Ensure all quantitative achievements are clearly visible.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-900 rounded-xl border border-red-700 shadow-2xl">
            <h3 className="3xl font-extrabold text-white mb-4">
                <span className="text-red-400">Action Plan:</span> Update Your CV Now
            </h3>
            <p className="text-gray-400 mb-6 border-b border-gray-700 pb-4">
                Prioritize these key areas identified by the AI to significantly boost your ATS match score.
            </p>

            <ul className="space-y-4">
                {improvementTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-red-900">
                        {/* Action Icon: Red Exclamation Mark */}
                        <svg className="w-5 h-5 mt-1 flex-shrink-0 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
                        </svg>
                        
                        <div className="flex flex-col">
                            <p className="font-bold text-white mb-1">
                                {tip.tip}
                            </p>
                            <p className="text-sm text-gray-400">
                                {tip.explanation}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pt-6 mt-6 border-t border-gray-700">
                <p className="text-sm text-indigo-400 font-medium">
                    Pro Tip: Use {proTip.action} and quantify {proTip.quantify}
                </p>
            </div>
        </div>
    );
};

export default Recommendations;