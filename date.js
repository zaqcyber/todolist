module.exports = () => {
    const today = new Date();
    const currentDay = today.getDay()

    var options = { weekday: 'long', 
        year: 'numeric', 
        month: 'long',
        day: 'numeric' 
    };
    return today.toLocaleDateString("en-US", options);
}