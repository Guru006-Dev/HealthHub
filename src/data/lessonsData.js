import { Droplet, Flame, Brain, Frown, Phone } from 'lucide-react';

// Import local images
// Bleeding
import washHandsImg from '../assets/wash_hands.png';
import applyPressureImg from '../assets/apply_pressure.png';
import bandageArmImg from '../assets/bandage_arm.png';
import coverBleedingImg from '../assets/cover_bleeding.png';

// Burns
import burnsMoveAwayImg from '../assets/burns_move_away.png';
import burnsCoolWaterImg from '../assets/burns_cool_water.png';
import burnsNoIceImg from '../assets/burns_no_ice.png';
import burnsCoverImg from '../assets/burns_cover.png';
import coverBurnsImg from '../assets/cover_burns.png';

// Nosebleed
import nosebleedSitForwardImg from '../assets/nosebleed_sit_forward.png';
import nosebleedPinchImg from '../assets/nosebleed_pinch.png';
import nosebleedBreatheMouthImg from '../assets/nosebleed_breathe_mouth.png';
import nosebleedTimerImg from '../assets/nosebleed_timer.png';
// Reusing pinch image as cover
const coverNosebleedImg = nosebleedPinchImg;

// Fainting
import faintingLieDownImg from '../assets/fainting_lie_down.png';
import faintingRaiseLegsImg from '../assets/fainting_raise_legs.png';
import faintingCheckBreathImg from '../assets/fainting_check_breath.png';
import faintingStayAwakeImg from '../assets/fainting_stay_awake.png';
// Reusing lie down image as cover
const coverFaintingImg = faintingLieDownImg;

// Emergency
import emergencyFindPhoneImg from '../assets/emergency_find_phone.png';
import emergencyDial911Img from '../assets/emergency_dial_911.png';
import emergencySayLocationImg from '../assets/emergency_say_location.png';
import emergencyDontHangUpImg from '../assets/emergency_dont_hang_up.png';
// Reusing dial 911 image as cover
const coverEmergencyImg = emergencyDial911Img;



export const lessonsData = [
    {
        id: 'bleeding',
        title: 'Bleeding',
        icon: Droplet,
        color: '#ef4444',
        cover: coverBleedingImg,
        videoId: 'gWT_mKZKw8Q', // Dr. Binocs - How Wounds Heal (Bleeding)
        steps: [
            {
                text: "Wash your hands correctly.",
                audio: "Wash your hands correctly.",
                image: washHandsImg
            },
            {
                text: "Put pressure on the wound with a clean cloth.",
                audio: "Put pressure on the wound with a clean cloth.",
                image: applyPressureImg
            },
            {
                text: "Keep pressure until bleeding stops.",
                audio: "Keep pressure until bleeding stops.",
                image: applyPressureImg
            },
            {
                text: "Cover with a bandage.",
                audio: "Cover with a bandage.",
                image: bandageArmImg
            }
        ],
        warnings: ["Call 911 if bleeding is heavy."]
    },
    {
        id: 'burns',
        title: 'Burns',
        icon: Flame,
        color: '#f97316',
        cover: coverBurnsImg,
        videoId: 'VS4ezqDKS8Y', // British Red Cross - Children First Aid: Burns
        steps: [
            {
                text: "Move away from the heat.",
                audio: "Move away from the heat.",
                image: burnsMoveAwayImg
            },
            {
                text: "Cool the burn under cool running water for 10 minutes.",
                audio: "Cool the burn under cool running water for 10 minutes.",
                image: burnsCoolWaterImg
            },
            {
                text: "Do NOT use ice or butter.",
                audio: "Do NOT use ice or butter.",
                image: burnsNoIceImg
            },
            {
                text: "Cover loosely with plastic wrap or clean cloth.",
                audio: "Cover loosely with plastic wrap or clean cloth.",
                image: burnsCoverImg
            }
        ],
        warnings: ["Tell an adult immediately."]
    },
    {
        id: 'nosebleed',
        title: 'Nosebleed',
        icon: Frown,
        color: '#e879f9',
        cover: coverNosebleedImg,
        videoId: '_UGeHti3zlI', // British Red Cross - Children First Aid: Nosebleed
        steps: [
            {
                text: "Sit down and lean forward slightly.",
                audio: "Sit down and lean forward slightly.",
                image: nosebleedSitForwardImg
            },
            {
                text: "Pinch the soft part of your nose.",
                audio: "Pinch the soft part of your nose.",
                image: nosebleedPinchImg
            },
            {
                text: "Breathe through your mouth.",
                audio: "Breathe through your mouth.",
                image: nosebleedBreatheMouthImg
            },
            {
                text: "Hold for 10 minutes.",
                audio: "Hold for 10 minutes.",
                image: nosebleedTimerImg
            }
        ],
        warnings: ["Do NOT tilt your head back."]
    },
    {
        id: 'fainting',
        title: 'Fainting',
        icon: Brain,
        color: '#8b5cf6',
        cover: coverFaintingImg,
        videoId: null, // Video removed due to restricted embedding
        steps: [
            {
                text: "Lie the person down on their back.",
                audio: "Lie the person down on their back.",
                image: faintingLieDownImg
            },
            {
                text: "Raise their legs slightly.",
                audio: "Raise their legs slightly.",
                image: faintingRaiseLegsImg
            },
            {
                text: "Make sure they are breathing.",
                audio: "Make sure they are breathing.",
                image: faintingCheckBreathImg
            },
            {
                text: "Stay with them until they wake up.",
                audio: "Stay with them until they wake up.",
                image: faintingStayAwakeImg
            }
        ],
        warnings: ["Call emergency if they don't wake up in 1 minute."]
    },
    {
        id: 'emergency',
        title: 'Call Help',
        icon: Phone,
        color: '#22c55e',
        cover: coverEmergencyImg,
        videoId: null, // Video removed as requested
        steps: [
            {
                text: "Find a phone.",
                audio: "Find a phone.",
                image: emergencyFindPhoneImg
            },
            {
                text: "Dial the emergency number (911 or 112).",
                audio: "Dial the emergency number.",
                image: emergencyDial911Img
            },
            {
                text: "Say your name and where you are.",
                audio: "Say your name and where you are.",
                image: emergencySayLocationImg
            },
            {
                text: "Do not hang up until told to.",
                audio: "Do not hang up until told to.",
                image: emergencyDontHangUpImg
            }
        ],
        warnings: []
    }
];
