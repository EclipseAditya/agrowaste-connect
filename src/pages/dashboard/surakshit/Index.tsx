import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Lock, Smartphone, WifiOff, MessageCircleWarning, Bot, Siren, DatabaseBackup, ShoppingCart, ShieldAlert, FileLock, HelpCircle, FileText, Phone, CalendarDays, Award, AlertTriangle, Newspaper, TriangleAlert, Map, Cpu, Network, ListChecks, Laptop, Globe, ArrowRightLeft, Target, Building } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// Import DashboardLayout
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Import modal components
import PhishingScenarioModal from './components/PhishingScenarioModal';
import RansomwareScenarioModal from './components/RansomwareScenarioModal';

// Import data
import phishingScenariosData from './data/phishingScenariosData.json';
import ransomwareScenariosData from './data/ransomwareScenariosData.json';

// Define types based on modal component props (or import from modals if exported)
interface PhishingScenario {
  id: number;
  title: string;
  description: string;
  options: { text: string; isCorrect: boolean }[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
  linkHoverText?: string;
  detailedFeedback?: { [key: number]: string };
}

interface RansomwareScenario {
  id: number;
  title: string;
  ransomNote: string;
  encryptedFiles: string[];
  options: { text: string; isSafe: boolean }[];
  feedbackSafe: string;
  feedbackUnsafe: string;
  timerText?: string;
  detailedFeedback?: { [key: number]: string };
}

const SurakshitBharatPage: React.FC = () => {
    // --- Start: Advanced Assessment State & Logic --- 
    const [advAssessmentOpen, setAdvAssessmentOpen] = useState(false);
    const [advAssessmentStep, setAdvAssessmentStep] = useState(0);
    const [advAnswers, setAdvAnswers] = useState<Record<string, string | boolean | string[]>>({});

    const advQuestions = [
        // Step 0: Devices
        {
            step: 0, title: "Device Inventory", questions: [
                { id: 'deviceTypes', label: 'What types of devices do you primarily use for farm management/online access?', type: 'checkbox', options: ['Windows PC', 'Mac', 'Android Phone/Tablet', 'iPhone/iPad', 'Farm-specific IoT Sensors', 'Automated Machinery Controls'] },
                { id: 'sharedDevices', label: 'Are these devices shared with family members or employees?', type: 'radio', options: ['Yes', 'No'] },
            ]
        },
        // Step 1: Software & Updates
        {
            step: 1, title: "Software & Updates", questions: [
                { id: 'osUpdates', label: 'How often do you update your operating system (Windows, macOS, Android, iOS)?', type: 'radio', options: ['Automatically', 'Regularly (Weekly/Monthly)', 'Occasionally', 'Rarely/Never'] },
                { id: 'softwareSource', label: 'Where do you typically install software/apps from?', type: 'radio', options: ['Official App Stores Only', 'Official Stores & Manufacturer Websites', 'Anywhere Online'] },
                { id: 'antivirus', label: 'Do you use antivirus/anti-malware software?', type: 'radio', options: ['Yes, reputable & updated', 'Yes, but unsure if updated', 'No'] },
            ]
        },
        // Step 2: Network & Connectivity
        {
            step: 2, title: "Network Security", questions: [
                { id: 'wifiPassword', label: 'Does your primary Wi-Fi network have a strong, unique password?', type: 'radio', options: ['Yes', 'No', 'Unsure'] },
                { id: 'guestNetwork', label: 'Do you use a separate guest network for visitors or untrusted devices?', type: 'radio', options: ['Yes', 'No', 'N/A'] },
                { id: 'publicWifi', label: 'How often do you use public Wi-Fi for sensitive tasks (banking, logins)?', type: 'radio', options: ['Regularly', 'Occasionally', 'Never'] },
            ]
        },
         // Step 3: Data & Practices
        {
            step: 3, title: "Data Handling", questions: [
                { id: 'backupFrequency', label: 'How often do you back up critical farm data?', type: 'radio', options: ['Daily/Weekly', 'Monthly', 'Occasionally', 'Never'] },
                { id: 'backupLocation', label: 'Where are backups stored?', type: 'checkbox', options: ['Cloud Service (Google Drive, etc.)', 'External Hard Drive (Offline)', 'Another Computer On Network', 'Same Device Only'] },
                { id: 'phishingTraining', label: 'Have you or your staff received any phishing awareness training?', type: 'radio', options: ['Yes', 'No'] },
            ]
        },
    ];
    const advTotalSteps = advQuestions.length;
    const advProgress = Math.round(((advAssessmentStep + 1) / advTotalSteps) * 100);

    const handleAdvAnswerChange = (id: string, value: string | boolean | string[]) => {
        setAdvAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleAdvNextStep = () => {
        if (advAssessmentStep < advTotalSteps - 1) {
            setAdvAssessmentStep(prev => prev + 1);
        }
    };
    const handleAdvPrevStep = () => {
        if (advAssessmentStep > 0) {
            setAdvAssessmentStep(prev => prev - 1);
        }
    };

    // SIMULATED Risk Calculation
    const calculatedRisks = useMemo(() => {
        let phishingRisk = 50;
        let malwareRisk = 50;
        let dataLossRisk = 50;

        if (advAnswers.phishingTraining === 'Yes') phishingRisk -= 20;
        if (advAnswers.publicWifi === 'Never') phishingRisk -= 10; else if (advAnswers.publicWifi === 'Occasionally') phishingRisk -= 5;

        if (advAnswers.antivirus === 'Yes, reputable & updated') malwareRisk -= 20;
        if (advAnswers.osUpdates === 'Automatically' || advAnswers.osUpdates === 'Regularly (Weekly/Monthly)') malwareRisk -= 15;
        if (advAnswers.softwareSource === 'Official App Stores Only') malwareRisk -= 15; else if (advAnswers.softwareSource === 'Official Stores & Manufacturer Websites') malwareRisk -= 5;
        if (advAnswers.wifiPassword === 'Yes') malwareRisk -= 5;

        if (advAnswers.backupFrequency === 'Daily/Weekly') dataLossRisk -= 20;
        if ((advAnswers.backupLocation as string[])?.includes('External Hard Drive (Offline)')) dataLossRisk -= 20;
        if ((advAnswers.backupLocation as string[])?.includes('Cloud Service (Google Drive, etc.)')) dataLossRisk -= 10;
        if (advAnswers.backupFrequency === 'Never') dataLossRisk += 30;

        const clamp = (val: number) => Math.max(0, Math.min(100, Math.round(val)));

        return {
            phishing: clamp(phishingRisk),
            malware: clamp(malwareRisk),
            dataLoss: clamp(dataLossRisk)
        };
    }, [advAnswers]);

    const resetAdvAssessment = () => {
        setAdvAssessmentStep(0);
        setAdvAnswers({});
        setAdvAssessmentOpen(false);
    }
    // --- End: Advanced Assessment State & Logic ---

    // State for Phishing Modal
    const [phishingModalOpen, setPhishingModalOpen] = useState(false);
    const [activePhishingScenario, setActivePhishingScenario] = useState<PhishingScenario | null>(null);

    // State for Ransomware Modal
    const [ransomwareModalOpen, setRansomwareModalOpen] = useState(false);
    const [activeRansomwareScenario, setActiveRansomwareScenario] = useState<RansomwareScenario | null>(null);

    // --- Start: IoT Checker State (Corrected Syntax) --- 
    const [selectedIoTDevice, setSelectedIoTDevice] = useState<string>('');
    const iotDevices = {
        'soil_sensor': {
            name: 'Smart Soil Sensor Array', 
            tips: [
                'Change default admin password immediately.',
                'Ensure firmware is updated regularly (check manufacturer support).',
                'Connect sensor gateway to an isolated network segment if possible.',
                'Disable unnecessary services/ports on the gateway.',
                'Monitor network traffic for anomalies.'
            ]
        },
        'irrigation_control': {
            name: 'Automated Irrigation Controller',
            tips: [
                'Use a strong, unique password for the control panel/app.',
                'Keep controller software/firmware up-to-date.',
                'Restrict network access to the controller (firewall rules).',
                'If cloud-connected, review cloud provider security settings.',
                'Disable remote access if not strictly needed.'
            ]
        },
        'drone_station': {
            name: 'Farm Drone & Charging Station',
            tips: [
                'Secure the drone\'s control app/software with a strong password/PIN.',
                'Update drone firmware and control app regularly.',
                'Be cautious connecting drone to untrusted Wi-Fi networks.',
                'Encrypt data stored on the drone\'s memory card if possible.',
                'Physically secure the charging station.'
            ]
        }
    };
    // --- End: IoT Checker State ---

    // --- Start: Secure Config Data (Placeholder) ---
    const secureConfigData = {
        os: {
            title: "Operating Systems (Windows/Mac)",
            icon: Laptop,
            tips: [
                "Keep OS fully updated with latest security patches.",
                "Use a standard user account, not admin, for daily tasks.",
                "Enable built-in firewall.",
                "Require login password/PIN/biometric on startup and wake.",
                "Review privacy settings to limit data sharing.",
                "Enable full disk encryption (BitLocker/FileVault)."
            ]
        },
        mobile: {
            title: "Mobile Devices (Android/iOS)",
            icon: Smartphone,
            tips: [
                "Set a strong screen lock (PIN, pattern, biometric).",
                "Keep OS and apps updated promptly.",
                "Install apps only from official stores (Play Store/App Store).",
                "Review app permissions regularly; revoke unnecessary ones.",
                "Enable Find My Device/Find My iPhone for remote wipe/locate.",
                "Be cautious about public Wi-Fi and Bluetooth connections."
            ]
        },
        browser: {
            title: "Web Browsers (Chrome/Firefox/Edge)",
            icon: Globe,
            tips: [
                "Keep browser updated to the latest version.",
                "Use strong, unique passwords for websites; consider a password manager.",
                "Install reputable security extensions (e.g., ad blocker, HTTPS Everywhere).",
                "Clear browsing data (cache, cookies) periodically.",
                "Review browser privacy and security settings (e.g., disable tracking, block popups).",
                "Be wary of installing too many extensions; vet them carefully."
            ]
        }
    };
    // --- End: Secure Config Data ---

    // Function to open Phishing Modal
    const handleOpenPhishingModal = () => {
        const randomIndex = Math.floor(Math.random() * phishingScenariosData.length);
        setActivePhishingScenario(phishingScenariosData[randomIndex]);
        setPhishingModalOpen(true);
    };

     // Function to open Ransomware Modal
    const handleOpenRansomwareModal = () => {
        const randomIndex = Math.floor(Math.random() * ransomwareScenariosData.length);
        setActiveRansomwareScenario(ransomwareScenariosData[randomIndex]);
        setRansomwareModalOpen(true);
    };

    // --- Start: Advanced Assessment Modal Render Function --- 
    const renderAdvancedAssessmentModal = () => {
         const currentStepData = advQuestions[advAssessmentStep];
         return (
            <Dialog open={advAssessmentOpen} onOpenChange={setAdvAssessmentOpen}>
                <DialogTrigger asChild>
                     <Button className="w-full mt-4" onClick={() => { setAdvAssessmentStep(0); setAdvAnswers({}); setAdvAssessmentOpen(true); }}>
                         <Cpu className="mr-2 h-4 w-4" /> Start Advanced AI Risk Assessment
                     </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Advanced Security Assessment ({advAssessmentStep + 1}/{advTotalSteps + 1})</DialogTitle> 
                        {/* +1 to total steps because result is a step */} 
                        <DialogDescription>{currentStepData?.title || 'Risk Analysis Results'}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-6 min-h-[200px]"> {/* Added min-height */} 
                        <Progress value={advProgress} className="w-full mb-4" />
                        {advAssessmentStep < advTotalSteps && currentStepData?.questions.map(q => (
                            <div key={q.id} className="space-y-2 animate-fadeIn">
                                <Label htmlFor={q.id}>{q.label}</Label>
                                {q.type === 'radio' && q.options && (
                                    <div id={q.id} className="flex flex-wrap gap-2">
                                        {q.options.map(opt => (
                                            <Button
                                                key={opt}
                                                variant={advAnswers[q.id] === opt ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => handleAdvAnswerChange(q.id, opt)}
                                            >
                                                {opt}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                                {q.type === 'checkbox' && q.options && (
                                    <div id={q.id} className="flex flex-wrap gap-2">
                                        {q.options.map(opt => (
                                            <Button
                                                key={opt}
                                                variant={(advAnswers[q.id] as string[])?.includes(opt) ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => {
                                                    const currentSelection = (advAnswers[q.id] as string[]) || [];
                                                    const newSelection = currentSelection.includes(opt)
                                                        ? currentSelection.filter(item => item !== opt)
                                                        : [...currentSelection, opt];
                                                    handleAdvAnswerChange(q.id, newSelection);
                                                }}
                                            >
                                                {opt}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {advAssessmentStep === advTotalSteps && (
                             <div className="animate-fadeIn">
                                <p className="font-semibold text-lg mb-4">AI Risk Analysis Complete:</p>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <Card className={`p-4 border-2 ${calculatedRisks.phishing > 60 ? 'border-red-500' : calculatedRisks.phishing > 30 ? 'border-yellow-500' : 'border-green-500'}`}>
                                        <CardTitle className="text-sm">Phishing Risk</CardTitle>
                                        <p className="text-2xl font-bold">{calculatedRisks.phishing}%</p>
                                    </Card>
                                     <Card className={`p-4 border-2 ${calculatedRisks.malware > 60 ? 'border-red-500' : calculatedRisks.malware > 30 ? 'border-yellow-500' : 'border-green-500'}`}>
                                        <CardTitle className="text-sm">Malware Risk</CardTitle>
                                        <p className="text-2xl font-bold">{calculatedRisks.malware}%</p>
                                    </Card>
                                     <Card className={`p-4 border-2 ${calculatedRisks.dataLoss > 60 ? 'border-red-500' : calculatedRisks.dataLoss > 30 ? 'border-yellow-500' : 'border-green-500'}`}>
                                        <CardTitle className="text-sm">Data Loss Risk</CardTitle>
                                        <p className="text-2xl font-bold">{calculatedRisks.dataLoss}%</p>
                                    </Card>
                                </div>
                                <p className="text-xs text-muted-foreground mt-4">Note: This is a simulated analysis. Higher percentages indicate greater potential risk based on your answers. Review relevant sections for improvement tips.</p>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="flex justify-between w-full">
                         <Button variant="outline" onClick={handleAdvPrevStep} disabled={advAssessmentStep === 0}>
                             Previous
                         </Button>
                         {advAssessmentStep < advTotalSteps -1 ? (
                             <Button onClick={handleAdvNextStep}>Next</Button>
                         ) : advAssessmentStep === advTotalSteps -1 ? (
                             <Button onClick={() => setAdvAssessmentStep(advTotalSteps)}>Finish & See Results</Button>
                         ) : (
                             <DialogClose asChild>
                                <Button onClick={resetAdvAssessment}>Close</Button>
                             </DialogClose>
                         )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
         );
    }
    // --- End: Advanced Assessment Modal Render Function ---

    // --- Start: Dummy India Threat Summary Data ---
    const indiaThreatSummaryData = {
        totalInbound: "34,581,300", // Example Data
        totalOutbound: "63,098,911", // Example Data
        topVectors: [
            { name: "DDoS", count: "1,489,663" },
            { name: "OWASP Top 10", count: "26,425,193" },
            { name: "Automated Threat", count: "6,666,444" },
            { name: "SQL Injection", count: "987,123" }, // Added one more
            { name: "Credential Stuffing", count: "812,456" } // Added one more
        ],
        topAttackingCountries: [
            { name: "Germany", count: "236,741" },
            { name: "United Arab Emirates", count: "275,920" }, // Swapped order to match image loosely
            { name: "France", count: "239,553" },
            { name: "Russia", count: "26,777,569" }, // Changed India to Russia for variety
            { name: "United States", count: "6,484,964" }
        ],
        topAttackedIndustries: [
            { name: "Travel", count: "1,187,361" },
            { name: "Lifestyle", count: "6,538,479" },
            { name: "Financial Services", count: "4,881,460" },
            { name: "Telecom and ISPs", count: "1,454,851" },
            { name: "Agriculture Tech", count: "1,945,414" } // Changed Business to Agri Tech
        ]
    };
    // --- End: Dummy India Threat Summary Data ---

    // State for Summary Dialog
    const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);

    // Return structure assumes DashboardLayout wraps content
    // Adjust if DashboardLayout is used differently
    return (
        <DashboardLayout> // Wrap content with DashboardLayout
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                 <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Surakshit Bharat - Cybersecurity Hub</h2>
                </div>

                <Tabs defaultValue="essentials" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="essentials">Security Essentials</TabsTrigger>
                        <TabsTrigger value="threats">Common Threats</TabsTrigger>
                        <TabsTrigger value="online">Online Safety</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="news">Security News</TabsTrigger>
                        <TabsTrigger value="response">Incident Response</TabsTrigger>
                        <TabsTrigger value="config">Configuration Guides</TabsTrigger>
                    </TabsList>

                    {/* Security Essentials Tab */}
                    <TabsContent value="essentials" className="space-y-4">
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Stay Vigilant!</AlertTitle>
                            <AlertDescription>
                                Protecting your digital information is crucial in modern farming. Learn the basics to stay safe online.
                            </AlertDescription>
                        </Alert>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Strong Passwords</CardTitle>
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Use complex, unique passwords for each account. Combine letters, numbers, and symbols. Consider a password manager.
                                    </p>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Two-Factor Auth (2FA)</CardTitle>
                                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                        Enable 2FA wherever possible. It adds an extra layer of security beyond just your password.
                                    </p>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Device & Software Security</CardTitle>
                                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">
                                       Keep OS, browsers, and apps updated. Install reputable antivirus software. Back up important data regularly.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="md:col-span-2 lg:col-span-3">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Mobile & Physical Security</CardTitle>
                                    <WifiOff className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Secure your phone/tablet with a strong PIN, pattern, or biometric lock.</li>
                                        <li>Download apps only from official stores (Google Play, Apple App Store).</li>
                                        <li>Be cautious using public Wi-Fi for sensitive transactions. Use a VPN if possible.</li>
                                        <li>Avoid charging devices using unknown public USB ports (risk of juice jacking).</li>
                                        <li>Be aware of shoulder surfing when entering passwords in public.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                         <Card className="mt-6">
                             <CardHeader>
                                <CardTitle>Advanced Security & Risk Assessment</CardTitle>
                                <CardDescription>Utilize our AI-powered analyzer to get a detailed breakdown of your potential security risks based on your setup and practices.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                {/* Render Advanced Assessment Modal Trigger */} 
                                <>{renderAdvancedAssessmentModal()}</> 
                            </CardContent>
                         </Card>
                    </TabsContent>

                    {/* Common Threats Tab */}
                    <TabsContent value="threats" className="space-y-4">
                         <Alert variant="destructive">
                            <Siren className="h-4 w-4" />
                            <AlertTitle>Common Cyber Threats</AlertTitle>
                            <AlertDescription>
                                Learn to recognize common attacks targeting farmers and agricultural businesses.
                            </AlertDescription>
                        </Alert>
                         <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="phishing">
                                <AccordionTrigger>Phishing Attacks</AccordionTrigger>
                                <AccordionContent className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Emails, messages, or calls pretending to be legitimate sources to steal your information (passwords, bank details).</p>
                                    <p className="text-sm font-medium">Signs:</p>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Urgent requests or threats.</li>
                                        <li>Generic greetings ("Dear Customer").</li>
                                        <li>Spelling/grammar errors.</li>
                                        <li>Suspicious sender addresses or links (hover to check!).</li>
                                        <li>Requests for sensitive information.</li>
                                    </ul>
                                    <p className="text-sm font-medium">Agri-Specific Examples:</p>
                                     <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Fake government subsidy emails asking for bank details.</li>
                                        <li>Emails pretending to be suppliers asking for urgent payment changes.</li>
                                        <li>Fake login pages for farming portals or market platforms.</li>
                                    </ul>
                                    {/* Placeholder button to trigger Phishing Modal */}
                                    <Button variant="outline" size="sm" onClick={handleOpenPhishingModal} className="mt-2">
                                       <Bot className="mr-2 h-4 w-4" /> Try Phishing Simulation
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="ransomware">
                                <AccordionTrigger>Ransomware</AccordionTrigger>
                                <AccordionContent className="space-y-2">
                                     <p className="text-sm text-muted-foreground">Malware that encrypts your files, making them inaccessible. Attackers demand payment (ransom) for the decryption key.</p>
                                     <p className="text-sm font-medium">Impact on Farms:</p>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Loss of critical data (financial records, crop data, livestock information).</li>
                                        <li>Disruption of operations (smart farming systems, irrigation controls).</li>
                                        <li>Financial loss due to ransom or recovery costs.</li>
                                    </ul>
                                     <p className="text-sm font-medium">Prevention:</p>
                                     <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Regular, tested backups are crucial! Store backups offline or isolated.</li>
                                        <li>Keep systems updated.</li>
                                        <li>Be cautious with email attachments and downloads.</li>
                                        <li>Use reputable security software.</li>
                                     </ul>
                                     {/* Placeholder button to trigger Ransomware Modal */}
                                    <Button variant="outline" size="sm" onClick={handleOpenRansomwareModal} className="mt-2">
                                       <FileLock className="mr-2 h-4 w-4" /> Try Ransomware Simulation
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="marketplace">
                                <AccordionTrigger>Suspicious Buyer/Seller Messages</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground">Be wary of messages on online platforms asking for personal info, payment outside the platform, or containing suspicious links.</p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                          <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center"><Map className="mr-2 h-5 w-5 text-blue-600" /> India Agri-Threat Landscape (Simulated)</CardTitle>
                                <CardDescription>Visualizing reported cybersecurity incidents impacting the agricultural sector in India. Hover over the map for summary details.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-2 border rounded-md bg-muted/20 aspect-video overflow-hidden relative flex justify-center items-center">
                                    {/* Display India Map Image with Tooltip */}
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <img 
                                                    src="/Screenshot 2025-04-20 013925.png" // Updated path to use the image from public folder
                                                    alt="Map of India showing simulated threat landscape" 
                                                    className="max-w-full max-h-full object-contain cursor-pointer" 
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-xs p-4 bg-background border rounded shadow-lg">
                                                <div className="space-y-2 text-sm">
                                                    <h4 className="font-semibold mb-2 text-center">India Threat Summary (Simulated)</h4>
                                                    {/* Total Attacks */} 
                                                    <div className="text-center text-xs font-medium mb-2">
                                                        <span className="text-blue-600 mr-2">Inbound: {indiaThreatSummaryData.totalInbound}</span>
                                                        <span className="text-red-600">Outbound: {indiaThreatSummaryData.totalOutbound}</span>
                                                    </div>
                                                    <hr className="my-2"/>
                                                    {/* Top 5 Lists */} 
                                                    <div className="space-y-2 text-xs">
                                                         {/* Vectors */} 
                                                         <div className="space-y-1">
                                                             <h5 className="font-semibold flex items-center"><Target className="mr-1 h-3 w-3"/> Vectors</h5>
                                                             <ul className="space-y-0.5 text-muted-foreground pl-4 list-disc">
                                                                 {indiaThreatSummaryData.topVectors.map(item => (
                                                                     <li key={item.name} className="flex justify-between"><span>{item.name}</span> <span>{item.count}</span></li>
                                                                 ))}
                                                             </ul>
                                                         </div>
                                                         {/* Countries */} 
                                                         <div className="space-y-1">
                                                             <h5 className="font-semibold flex items-center"><Globe className="mr-1 h-3 w-3"/> Attacking Countries</h5>
                                                             <ul className="space-y-0.5 text-muted-foreground pl-4 list-disc">
                                                                 {indiaThreatSummaryData.topAttackingCountries.map(item => (
                                                                     <li key={item.name} className="flex justify-between"><span>{item.name}</span> <span>{item.count}</span></li>
                                                                 ))}
                                                             </ul>
                                                         </div>
                                                         {/* Industries */} 
                                                         <div className="space-y-1">
                                                             <h5 className="font-semibold flex items-center"><Building className="mr-1 h-3 w-3"/> Attacked Industries</h5>
                                                             <ul className="space-y-0.5 text-muted-foreground pl-4 list-disc">
                                                                 {indiaThreatSummaryData.topAttackedIndustries.map(item => (
                                                                     <li key={item.name} className="flex justify-between"><span>{item.name}</span> <span>{item.count}</span></li>
                                                                 ))}
                                                             </ul>
                                                         </div>
                                                     </div>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                {/* Removed SVG, threat points, and legend */}
                                {/* Removed Threat Summary Dialog Trigger Button */}
                            </CardContent>
                          </Card>
                    </TabsContent>

                    {/* Online Safety Tab */}
                    <TabsContent value="online" className="space-y-4">
                         <Alert>
                            <ShoppingCart className="h-4 w-4" />
                            <AlertTitle>Safe Online Transactions</AlertTitle>
                            <AlertDescription>
                                Tips for staying secure when buying or selling online, especially on agricultural marketplaces.
                            </AlertDescription>
                        </Alert>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Common Marketplace Risks</CardTitle>
                                     <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                     <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Account Takeover: Weak passwords allow others access.</li>
                                        <li>Payment Fraud: Scams involving fake payments or requests for advance fees.</li>
                                        <li>Fake Listings/Buyers: Misleading product descriptions or fraudulent buyers.</li>
                                        <li>Information Theft: Phishing attempts via platform messages.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Secure Practices</CardTitle>
                                     <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>Use strong, unique passwords & enable 2FA for marketplace accounts.</li>
                                        <li>Verify website security (HTTPS).</li>
                                        <li>Use secure, traceable payment methods recommended by the platform. Avoid direct bank transfers if possible.</li>
                                        <li>Communicate and transact within the platform's official channels.</li>
                                        <li>Be wary of deals that seem too good to be true.</li>
                                        <li>Report suspicious activity immediately.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Data Privacy</CardTitle>
                                    <CardDescription>Understanding your rights and responsibilities (Ref: DPDP Act, India).</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>**Consent:** Your data should only be processed with clear consent for specific purposes.</li>
                                        <li>**Purpose Limitation:** Data collected for one reason shouldn't be used for another without consent.</li>
                                        <li>**Data Minimisation:** Only necessary data should be collected.</li>
                                        <li>**User Rights:** You have rights to access, correct, and erase your data.</li>
                                        <li>**Security Safeguards:** Platforms must protect your data.</li>
                                        <li>**Breach Notification:** You should be informed of significant data breaches.</li>
                                    </ul>
                                    <p className="text-xs text-muted-foreground mt-2">Be mindful of the data you share online and review privacy policies.</p>
                                </CardContent>
                            </Card>
                        </div>
                        {selectedIoTDevice && iotDevices[selectedIoTDevice as keyof typeof iotDevices] && (
                            <div className="mt-4 p-4 border rounded-md bg-background">
                                <h4 className="font-semibold mb-2 flex items-center"><ListChecks className="mr-2 h-4 w-4"/> Security Checklist for {iotDevices[selectedIoTDevice as keyof typeof iotDevices].name}:</h4>
                                 <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                     {iotDevices[selectedIoTDevice as keyof typeof iotDevices].tips.map((tip, index) => (
                                         <li key={index}>{tip}</li>
                                     ))}
                                 </ul>
                            </div>
                        )}
                    </TabsContent>

                     {/* Resources Tab */}
                    <TabsContent value="resources" className="space-y-4">
                         <Alert>
                             <HelpCircle className="h-4 w-4" />
                            <AlertTitle>Help & Further Learning</AlertTitle>
                            <AlertDescription>
                                Access helpful guides, support channels, and training resources.
                            </AlertDescription>
                        </Alert>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                             <Card>
                                <CardHeader>
                                    <CardTitle>Guides & Documents</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li><a href="#" target="_blank" rel="noopener noreferrer" className="underline">Govt. Cyber Awareness Portal</a></li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer" className="underline">CERT-In Security Guidelines</a></li>
                                        <li><a href="#" target="_blank" rel="noopener noreferrer" className="underline">Digital India Resources</a></li>
                                        {/* Add more relevant links */}
                                    </ul>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Helplines & Support</CardTitle>
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                     <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
                                        <li>National Cyber Crime Reporting Portal: 1930</li>
                                        <li>CERT-In Incident Response</li>
                                        <li>Platform Specific Support (Link/Contact)</li>
                                     </ul>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle>Training & Webinars</CardTitle>
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">Upcoming platform security webinars (TBD).</p>
                                    <p className="text-xs text-muted-foreground">Check external cybersecurity training providers.</p>
                                </CardContent>
                            </Card>
                              <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Security Certification (Concept)</CardTitle>
                                     <Award className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-muted-foreground">We are exploring a program to recognize users who complete security training modules and demonstrate safe practices on the platform.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Security News Tab (Populated) */}
                    <TabsContent value="news" className="space-y-4">
                        <Alert>
                            <Newspaper className="h-4 w-4" />
                            <AlertTitle>Latest Security News & Alerts</AlertTitle>
                            <AlertDescription>Stay informed about recent cybersecurity threats relevant to agriculture.</AlertDescription>
                        </Alert>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Phishing Campaign Targeting Subsidy Applicants</CardTitle>
                                <CardDescription>Published: July 20, 2024 - Source: CERT-In</CardDescription> {/* Example Date */} 
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">A new phishing campaign is using emails disguised as government subsidy notifications. Be wary of unsolicited emails asking for personal or bank details. Always verify schemes on official government websites.</p>
                                <Button variant="link" className="p-0 h-auto mt-2"><a href="#cert-advisory-phishing" target="_blank" rel="noopener noreferrer">Read More (CERT-In Advisory)</a></Button> {/* Example Link ID */} 
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                               <CardTitle className="text-lg">Ransomware Alert: New Variant Affecting Farm Management Software</CardTitle>
                               <CardDescription>Published: July 15, 2024 - Source: AgriSec Analytics Blog</CardDescription> {/* Example Date/Source */} 
                           </CardHeader>
                           <CardContent>
                               <p className="text-sm text-muted-foreground">A new ransomware strain is reportedly targeting specific agricultural software. Ensure your systems are patched, backups are tested, and security software is updated.</p>
                               <Button variant="link" className="p-0 h-auto mt-2"><a href="#vendor-blog-ransomware" target="_blank" rel="noopener noreferrer">Technical Details</a></Button> {/* Example Link ID */} 
                           </CardContent>
                       </Card>
                    </TabsContent>

                    {/* Incident Response Tab (Populated) */} 
                    <TabsContent value="response" className="space-y-4">
                        <Alert>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>Incident Response</AlertTitle>
                            <AlertDescription>
                                Learn about CERT-In's role in incident response and how to report cybersecurity incidents.
                            </AlertDescription>
                        </Alert>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <p className="text-sm text-muted-foreground">
                                        CERT-In Incident Response
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground">
                                        CERT-In is the nodal agency for cyber security incident response in India. They provide guidance on incident response, reporting, and prevention.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>
                                    <p className="text-sm text-muted-foreground">
                                        Reporting a Cyber Incident
                                    </p>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-muted-foreground">
                                        If you suspect a cybersecurity incident, report it to CERT-In immediately. They can help you assess the situation and provide guidance on how to respond.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Card>
                            <CardHeader>
                                <CardTitle>Important Contacts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                 <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                    <li>National Cyber Crime Helpline: 1930</li>
                                    <li>Online Reporting: <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">cybercrime.gov.in</a></li>
                                    <li>CERT-In Incident Response: Email: <a href="mailto:incident@cert-in.org.in" className="underline">incident@cert-in.org.in</a> | Phone: <a href="tel:+911800114949" className="underline">1800-11-4949</a> (Toll-Free)</li> {/* Updated CERT-In Info */} 
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Secure Configuration Guides Tab */} 
                    <TabsContent value="config" className="space-y-4">
                        <Alert>
                            <ListChecks className="h-4 w-4" />
                            <AlertTitle>Secure Configuration Checklists</AlertTitle>
                            <AlertDescription>
                                Follow these guides to harden the security of your common devices and software.
                            </AlertDescription>
                        </Alert>
                        <Accordion type="multiple" className="w-full">
                            {Object.entries(secureConfigData).map(([key, category]) => (
                                <AccordionItem value={key} key={key}>
                                    <AccordionTrigger>
                                        <div className="flex items-center">
                                            <category.icon className="mr-2 h-5 w-5 text-primary" /> 
                                            {category.title}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc pl-8 space-y-1 text-sm text-muted-foreground">
                                            {category.tips.map((tip, index) => (
                                                <li key={index}>{tip}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                </Tabs>

                {/* Render Modals (initially hidden) */}
                <PhishingScenarioModal
                    isOpen={phishingModalOpen}
                    onOpenChange={setPhishingModalOpen}
                    scenario={activePhishingScenario}
                 />
                 <RansomwareScenarioModal
                    isOpen={ransomwareModalOpen}
                    onOpenChange={setRansomwareModalOpen}
                    scenario={activeRansomwareScenario}
                 />
            </div>
        </DashboardLayout> // Close DashboardLayout
    );
};

export default SurakshitBharatPage; 