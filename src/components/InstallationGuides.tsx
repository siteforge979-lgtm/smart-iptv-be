import { useState } from 'react';
import { 
  Tv, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  AlertCircle,
  Wifi,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  Mail,
  ExternalLink
} from 'lucide-react';

interface InstallationGuidesProps {
  brandName?: string;
  primaryColor?: string;
  supportEmail?: string;
  whatsappNumber?: string;
  telegramUsername?: string;
}

interface DeviceGuide {
  id: string;
  name: string;
  icon: typeof Tv;
  apps: string[];
  steps: string[];
  note?: string;
}

const DEVICE_GUIDES: DeviceGuide[] = [
  {
    id: 'firestick',
    name: 'Firestick / Fire TV / Fire Cube',
    icon: Tv,
    apps: ['IPTV Smarters Pro (APK)', 'TiviMate (APK)', 'XCIPTV (APK)'],
    steps: [
      "Enable 'Apps from Unknown Sources' in your Firestick settings under My Fire TV > Developer Options.",
      "Install the 'Downloader' app from the Amazon Appstore.",
      "Open Downloader and enter the URL for your preferred IPTV app (e.g., IPTV Smarters Pro APK).",
      "Download and install the IPTV application.",
      "Open the IPTV app and select 'Xtream Codes API' or 'M3U URL' login method.",
      "Enter your credentials from your subscription email.",
      "Wait for channels to load and start streaming!"
    ]
  },
  {
    id: 'android',
    name: 'Android Devices (Phones, Boxes, TVs)',
    icon: Smartphone,
    apps: ['IPTV Smarters Pro', 'TiviMate', 'GSE Smart IPTV', 'Perfect Player', 'VLC Media Player'],
    steps: [
      "Open the Google Play Store on your Android device.",
      "Search for an IPTV player app. We recommend 'IPTV Smarters Pro' or 'TiviMate'.",
      "Download and install your preferred app.",
      "Open the app and choose to add a playlist or log in.",
      "Enter your M3U URL or Xtream Codes API credentials from your subscription email.",
      "The channels will load automatically. Enjoy streaming!"
    ]
  },
  {
    id: 'smart-tv',
    name: 'Smart TVs (Samsung, LG, Sony, etc.)',
    icon: Tv,
    apps: ['IPTV Smarters Pro', 'TiviMate', 'GSE Smart IPTV', 'Smart IPTV (SIPTV)'],
    steps: [
      "Turn on your Smart TV and ensure it's connected to the internet.",
      "Navigate to your TV's App Store (Samsung App Store, LG Content Store, etc.).",
      "Search for an IPTV player app like 'IPTV Smarters Pro' or 'Smart IPTV'.",
      "Download and install your chosen app.",
      "Open the app and select the login method (M3U URL or Xtream Codes API).",
      "Enter the credentials provided in your subscription email.",
      "For 'Smart IPTV (SIPTV)': Visit siptv.app, enter your TV's MAC address, and upload the M3U playlist URL.",
      "Once configured, the channels will load. Enjoy!"
    ]
  },
  {
    id: 'windows',
    name: 'Windows PCs & Laptops',
    icon: Monitor,
    apps: ['VLC Media Player', 'IPTV Smarters Pro', 'MyIPTV Player', 'Kodi'],
    steps: [
      "Download an IPTV player for Windows. We recommend 'VLC Media Player' or 'IPTV Smarters Pro'.",
      "Install the player on your PC.",
      "For VLC: Open VLC > Media > Open Network Stream. Paste your M3U URL and click Play.",
      "For IPTV Smarters Pro: Download from the official website, install, and log in with your Xtream Codes API or M3U URL.",
      "For MyIPTV Player: Install from Microsoft Store. Go to Settings > Add new playlist. Enter your M3U URL.",
      "Your channels will load. Enjoy watching!"
    ]
  },
  {
    id: 'ios',
    name: 'iOS (iPhones, iPads, Apple TV)',
    icon: Tablet,
    apps: ['GSE Smart IPTV', 'IPTV Smarters Player', 'iPlayTV (Apple TV)', 'Cloud Stream IPTV'],
    steps: [
      "Open the App Store on your iPhone, iPad, or Apple TV.",
      "Search for an IPTV player. We recommend 'GSE Smart IPTV' or 'IPTV Smarters Player'.",
      "Download and install the app.",
      "Open the app and look for an option to add a playlist ('+' icon) or log in.",
      "Enter the M3U URL or Xtream Codes API details from your subscription email.",
      "Your channels will appear. Start watching!"
    ]
  },
  {
    id: 'mac',
    name: 'macOS (MacBooks, iMacs)',
    icon: Monitor,
    apps: ['VLC Media Player', 'GSE Smart IPTV', 'IPTV Smarters Pro', 'Kodi'],
    steps: [
      "Download an IPTV player for macOS. We recommend 'VLC Media Player' or 'GSE Smart IPTV'.",
      "Install your chosen application.",
      "For VLC: Open VLC > File > Open Network. Paste your M3U URL and click Open.",
      "For GSE Smart IPTV / IPTV Smarters: Open the app and log in using the Xtream Codes API or M3U URL.",
      "Your playlist will load, and you can start streaming."
    ]
  },
  {
    id: 'mag',
    name: 'MAG Devices (STB, TVIP, Formuler)',
    icon: Tv,
    apps: ['STB Emulator', 'Built-in MAG Portal'],
    steps: [
      "Connect your MAG box to your TV and internet.",
      "Go to Settings > System Settings > Servers > Portals.",
      "For 'Portal 1' (or an empty portal), enter the Portal URL provided in your subscription email.",
      "Save and reboot the device/portal.",
      "The portal should load, giving you access to all channels.",
      "For STB Emulator App: Install the app, go to Settings > Profiles > Add Profile.",
      "Configure the MAC address and Portal URL, then save and load the profile."
    ]
  },
  {
    id: 'enigma2',
    name: 'Enigma2 / ZGEMMA',
    icon: Tv,
    apps: ['PuTTY (Telnet/SSH)', 'FileZilla (FTP)', 'JediMaker Xtream'],
    steps: [
      "Ensure your Enigma2 device is connected to your network.",
      "Connect to your device via FTP client (FileZilla) or SSH (PuTTY) from your computer.",
      "Navigate to the '/etc/enigma2/' directory.",
      "Create a bouquet file and add it to the 'bouquets.tv' file.",
      "Alternatively, use the script command provided in your subscription email via Telnet/PuTTY.",
      "Restart the Enigma2 GUI after running the command or uploading files.",
      "Your IPTV channels will appear in your channel list."
    ]
  },
  {
    id: 'chromecast',
    name: 'Chromecast with Google TV',
    icon: Play,
    apps: ['IPTV Smarters Pro', 'TiviMate', 'GSE Smart IPTV', 'BubbleUPnP'],
    steps: [
      "Chromecast with Google TV runs on Android TV OS, so the setup is similar to Android TV.",
      "From the Google TV home screen, go to the 'Apps' tab.",
      "Search for an IPTV player like 'IPTV Smarters Pro' or 'TiviMate'.",
      "Install your chosen app from the Play Store.",
      "Open the app and log in using your M3U URL or Xtream Codes API details.",
      "For older Chromecasts (without Google TV): Install an IPTV app on your phone and use the 'Cast' icon to stream to your Chromecast."
    ]
  }
];

const TROUBLESHOOTING_TIPS = [
  {
    icon: Wifi,
    title: 'Check Internet Connection',
    description: 'A stable connection of at least 15-20 Mbps is recommended for HD streaming.'
  },
  {
    icon: AlertCircle,
    title: 'Verify Credentials',
    description: 'Ensure your M3U URL or Xtream Codes API details are entered correctly. They are case-sensitive.'
  },
  {
    icon: RefreshCw,
    title: 'Update & Restart',
    description: 'Update your IPTV player app to the latest version and restart your device and router.'
  },
  {
    icon: HelpCircle,
    title: 'Clear App Cache',
    description: 'Clear the cache of your IPTV player app if you experience loading issues.'
  }
];

function DeviceCard({ guide, primaryColor, isExpanded, onToggle }: { 
  guide: DeviceGuide; 
  primaryColor: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = guide.icon;
  
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <Icon className="w-6 h-6" style={{ color: primaryColor }} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{guide.name}</h3>
            <p className="text-sm text-muted-foreground">
              Popular Apps: {guide.apps.slice(0, 2).join(', ')}...
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 md:px-6 pb-6 border-t border-border">
          <div className="pt-6">
            <h4 className="font-semibold mb-4">Step-by-Step Instructions:</h4>
            <ol className="space-y-3">
              {guide.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <h5 className="font-medium mb-2">Recommended Apps:</h5>
              <div className="flex flex-wrap gap-2">
                {guide.apps.map((app, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground italic">
              Note: App availability and exact steps might vary slightly depending on your device model and software version. Always refer to the subscription email for specific links or credentials.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InstallationGuides({
  brandName = 'Premium IPTV',
  primaryColor = '#3b82f6',
  supportEmail = '',
  whatsappNumber = '',
  telegramUsername = '',
}: InstallationGuidesProps) {
  const [expandedGuide, setExpandedGuide] = useState<string | null>('firestick');
  
  const toggleGuide = (id: string) => {
    setExpandedGuide(expandedGuide === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Installation Guides</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step instructions to set up {brandName} on your favorite devices. Get ready to stream in minutes!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {DEVICE_GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <button
                  key={guide.id}
                  onClick={() => {
                    setExpandedGuide(guide.id);
                    document.getElementById(`guide-${guide.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors text-left"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <span className="font-medium text-sm">{guide.name}</span>
                </button>
              );
            })}
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold mb-6">Detailed Setup Instructions</h2>
            {DEVICE_GUIDES.map((guide) => (
              <div key={guide.id} id={`guide-${guide.id}`}>
                <DeviceCard
                  guide={guide}
                  primaryColor={primaryColor}
                  isExpanded={expandedGuide === guide.id}
                  onToggle={() => toggleGuide(guide.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Troubleshooting Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {TROUBLESHOOTING_TIPS.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-8">
              Our expert support team is ready to assist you 24/7 with any installation questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(brandName)}%2C%20I%20need%20help%20with%20installation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Support
                </a>
              )}
              {telegramUsername && (
                <a
                  href={`https://t.me/${telegramUsername.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: '#0088cc' }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Telegram Support
                </a>
              )}
              {supportEmail && (
                <a
                  href={`mailto:${supportEmail}?subject=Installation%20Help%20-%20${encodeURIComponent(brandName)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-border hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Email Support
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
