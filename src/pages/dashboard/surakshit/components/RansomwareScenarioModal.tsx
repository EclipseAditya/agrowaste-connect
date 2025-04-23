import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileLock, ShieldAlert, ShieldCheck } from 'lucide-react';

// Define a basic type for the scenario data (adjust as needed)
interface RansomwareScenario {
  id: number;
  title: string;
  ransomNote: string; // The simulated ransomware message
  encryptedFiles: string[]; // List of 'affected' files
  options: { text: string; isSafe: boolean }[]; // isSafe indicates the recommended action
  feedbackSafe: string; // Basic feedback for safe actions
  feedbackUnsafe: string; // Basic feedback for unsafe actions
  timerText?: string; // Optional: Text representing a countdown timer
  detailedFeedback?: { [key: number]: string }; // Optional: Detailed feedback per option index
}

interface RansomwareScenarioModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  scenario: RansomwareScenario | null;
}

const RansomwareScenarioModal: React.FC<RansomwareScenarioModalProps> = ({ isOpen, onOpenChange, scenario }) => {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [displayTimer, setDisplayTimer] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isOpen && scenario?.timerText) {
      setDisplayTimer(scenario.timerText);

      intervalId = setInterval(() => {
        setDisplayTimer(prevTimer => {
          if (!prevTimer) return null;
          const parts = prevTimer.split(':');
          if (parts.length === 3) {
            let [h, m, s] = parts.map(Number);
            if (s > 0) s--;
            else if (m > 0) { s = 59; m--; }
            else if (h > 0) { s = 59; m = 59; h--; }
            else return "00:00:00";
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          }
          return prevTimer;
        });
      }, 1000);
    } else {
      setDisplayTimer(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, scenario]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const handleClose = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    onOpenChange(false);
  }

  if (!scenario) return null;

  const isSafeSelection = selectedOption !== null && scenario.options[selectedOption]?.isSafe;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center"><FileLock className="mr-2 h-5 w-5 text-red-600" /> {scenario.title}</DialogTitle>
          <DialogDescription>Your files have been encrypted! Read the message and decide how to respond.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {/* Display the simulated ransomware note */}
          <div className="p-4 border border-red-500 rounded-md bg-destructive/10 text-sm text-destructive font-mono space-y-2">
            <p className="whitespace-pre-wrap">{scenario.ransomNote}</p>
            {displayTimer && (
              <p className="text-center font-bold text-lg animate-pulse">{displayTimer}</p>
            )}
          </div>

           {/* Display 'encrypted' files */}
            <div>
              <p className="text-sm font-medium mb-1">Affected Files:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside max-h-20 overflow-y-auto border rounded p-2 bg-muted/40">
                {scenario.encryptedFiles.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
            </div>

           {!showFeedback && (
             <div className="space-y-2">
               <p className="font-medium">What is your next step?</p>
               {scenario.options.map((option, index) => (
                 <Button
                   key={index}
                   variant="outline"
                   className="w-full justify-start text-left h-auto whitespace-normal"
                   onClick={() => handleOptionSelect(index)}
                 >
                   {option.text}
                 </Button>
               ))}
             </div>
           )}

           {showFeedback && selectedOption !== null && (
            <Alert variant={isSafeSelection ? 'default' : 'destructive'}>
               {isSafeSelection ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
               <AlertTitle>{isSafeSelection ? 'Recommended Action!' : 'Risky Action!'}</AlertTitle>
               <AlertDescription>
                 {// Use detailed feedback if available, otherwise fallback to basic feedback
                   scenario.detailedFeedback?.[selectedOption] ?? (isSafeSelection ? scenario.feedbackSafe : scenario.feedbackUnsafe)
                 }
               </AlertDescription>
             </Alert>
           )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RansomwareScenarioModal; 