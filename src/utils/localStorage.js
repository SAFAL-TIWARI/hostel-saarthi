
// Initial Data
const initialRooms = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    number: 101 + i,
    capacity: 3,
    occupied: Math.floor(Math.random() * 4), // Random 0-3
    status: 'Available', // Available, Full, Maintenance
}));

// Lost & Found
const initialLostFound = [
    {
        id: 1,
        title: 'Blue Water Bottle',
        description: 'Found in the common room near the TV.',
        location: 'Common Room',
        status: 'Found', // Lost, Found, Claimed, Returned
        contact: 'Warden Office',
        date: new Date().toISOString(),
        image: 'https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
        id: 2,
        title: 'Casio Scientific Calculator',
        description: 'Lost during mathematics exam preparation.',
        location: 'Study Hall',
        status: 'Lost',
        contact: 'Room 203',
        date: new Date(Date.now() - 86400000).toISOString(),
        image: null
    }
];

// Polls
const initialPolls = [
    {
        id: 1,
        question: 'What should be the special menu for Sunday?',
        options: [
            { id: 'opt1', text: 'Chole Bhature', votes: 15 },
            { id: 'opt2', text: 'Masala Dosa', votes: 22 },
            { id: 'opt3', text: 'Pav Bhaji', votes: 10 }
        ],
        createdBy: 'warden',
        status: 'Active', // Active, Closed
        votedBy: [] // Array of student IDs
    }
];

// Complaints
const initialComplaints = [
    {
        id: 1,
        title: 'Broken Window Latch',
        description: 'The latch on the window in room 204 is broken and does not close properly.',
        type: 'Maintenance',
        status: 'Pending',
        date: new Date().toISOString(),
        studentName: 'Rahul Kumar',
        room: '204'
    },
    {
        id: 2,
        title: 'Water Cooler Not Cooling',
        description: 'The water cooler on the 2nd floor is dispensing warm water.',
        type: 'Infrastructure',
        status: 'Resolved',
        date: new Date(Date.now() - 172800000).toISOString(),
        studentName: 'Amit Singh',
        room: '208'
    }
];

// Gate Passes
const initialGatePasses = [
    {
        id: 1,
        studentName: 'Vikram Malhotra',
        room: '302',
        reason: 'Weekend Home Visit',
        destination: 'Mumbai',
        outTime: new Date(Date.now() + 86400000).toISOString(),
        returnTime: new Date(Date.now() + 259200000).toISOString(),
        status: 'Pending',
        requestedAt: new Date().toISOString()
    }
];

const STUDENTS_KEY = 'hostel_students';
const COMPLAINTS_KEY = 'hostel_complaints';
const GATE_PASSES_KEY = 'hostel_gate_passes';
const ROOMS_KEY = 'hostel_rooms';
const AUTH_KEY = 'hostel_auth';
const LOST_FOUND_KEY = 'hostel_lost_found';
const POLLS_KEY = 'hostel_polls';

export const initializeData = () => {
    if (!localStorage.getItem(ROOMS_KEY)) {
        localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
    }
    if (!localStorage.getItem(COMPLAINTS_KEY)) {
        localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(initialComplaints));
    }
    if (!localStorage.getItem(GATE_PASSES_KEY)) {
        localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(initialGatePasses));
    }
    if (!localStorage.getItem(LOST_FOUND_KEY)) {
        localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(initialLostFound));
    }
    if (!localStorage.getItem(POLLS_KEY)) {
        localStorage.setItem(POLLS_KEY, JSON.stringify(initialPolls));
    }
};

// Rooms
export const getRooms = () => JSON.parse(localStorage.getItem(ROOMS_KEY)) || [];
export const updateRoomStatus = (roomId, status) => {
    const rooms = getRooms();
    const index = rooms.findIndex((r) => r.id === roomId);
    if (index !== -1) {
        rooms[index].status = status; // Start with status update logic
        if (status === 'Available') rooms[index].occupied = 0; // Reset for simplicity
        localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
        return true;
    }
    return false;
};

export const bookRoom = (roomId) => {
    const rooms = getRooms();
    const index = rooms.findIndex((r) => r.id === roomId);
    if (index !== -1) {
        if (rooms[index].occupied < rooms[index].capacity) {
            rooms[index].occupied += 1;
            if (rooms[index].occupied >= rooms[index].capacity) {
                rooms[index].status = 'Full';
            }
            localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
            return true;
        }
    }
    return false;
}

// Complaints
export const getComplaints = () => JSON.parse(localStorage.getItem(COMPLAINTS_KEY)) || [];
export const addComplaint = (complaint) => {
    const complaints = getComplaints();
    const newComplaint = { ...complaint, id: Date.now(), status: 'Pending', date: new Date().toISOString() };
    complaints.push(newComplaint);
    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
    return newComplaint;
};
export const resolveComplaint = (id) => {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === id);
    if (index !== -1) {
        complaints[index].status = 'Resolved';
        localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
        return true;
    }
    return false;
};

// Gate Passes
export const getGatePasses = () => JSON.parse(localStorage.getItem(GATE_PASSES_KEY)) || [];
export const requestGatePass = (request) => {
    const passes = getGatePasses();
    const newPass = { ...request, id: Date.now(), status: 'Pending', requestedAt: new Date().toISOString() };
    passes.push(newPass);
    localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(passes));
    return newPass;
};
export const updateGatePassStatus = (id, status) => {
    const passes = getGatePasses();
    const index = passes.findIndex(p => p.id === id);
    if (index !== -1) {
        passes[index].status = status;
        localStorage.setItem(GATE_PASSES_KEY, JSON.stringify(passes));
        return true;
    }
    return false;
};

// Lost & Found
export const getLostFoundItems = () => JSON.parse(localStorage.getItem(LOST_FOUND_KEY)) || [];
export const addLostFoundItem = (item) => {
    const items = getLostFoundItems();
    const newItem = { ...item, id: Date.now(), date: new Date().toISOString() };
    items.unshift(newItem); // Add to beginning
    localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(items));
    return newItem;
};
export const updateLostFoundStatus = (id, status) => {
    const items = getLostFoundItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items[index].status = status;
        localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(items));
        return true;
    }
    return false;
};
export const deleteLostFoundItem = (id) => {
    const items = getLostFoundItems();
    const newItems = items.filter(i => i.id !== id);
    localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(newItems));
    return true;
};

// Polls
export const getPolls = () => JSON.parse(localStorage.getItem(POLLS_KEY)) || [];
export const createPoll = (poll) => {
    const polls = getPolls();
    const newPoll = {
        ...poll,
        id: Date.now(),
        status: 'Active',
        options: poll.options.map((opt, idx) => ({ id: `opt_${Date.now()}_${idx}`, text: opt, votes: 0 })),
        votedBy: []
    };
    polls.unshift(newPoll);
    localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
    return newPoll;
};
export const votePoll = (pollId, optionId, userId) => {
    const polls = getPolls();
    const pollIndex = polls.findIndex(p => p.id === pollId);

    // Simple check to prevent double voting
    // In a real app, userId should be unique and persistent. 
    // Here we might just use a session-based approach or assume strict login.
    if (pollIndex !== -1) {
        const poll = polls[pollIndex];
        if (poll.votedBy.includes(userId)) return false;

        const optionIndex = poll.options.findIndex(o => o.id === optionId);
        if (optionIndex !== -1) {
            poll.options[optionIndex].votes += 1;
            poll.votedBy.push(userId);
            localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
            return true;
        }
    }
    return false;
};
export const closePoll = (pollId) => {
    const polls = getPolls();
    const index = polls.findIndex(p => p.id === pollId);
    if (index !== -1) {
        polls[index].status = 'Closed';
        localStorage.setItem(POLLS_KEY, JSON.stringify(polls));
        return true;
    }
    return false;
};

// Auth
export const loginUser = (role) => {
    // Generate a pseudo-random ID for voting tracking if not present
    const existingUser = JSON.parse(localStorage.getItem(AUTH_KEY));
    const userId = existingUser?.id || `user_${Date.now()}`;

    const user = { role, name: role === 'student' ? 'Aditya Student' : 'Warden Sir', id: userId };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
};

export const logoutUser = () => {
    localStorage.removeItem(AUTH_KEY);
}
