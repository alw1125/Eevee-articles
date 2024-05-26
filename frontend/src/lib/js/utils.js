export function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const suffix = dayOfMonth % 10 == 1 && dayOfMonth != 11 ? "st" :
                dayOfMonth % 10 == 2 && dayOfMonth != 12 ? "nd" :
                dayOfMonth % 10 == 3 && dayOfMonth != 13 ? "rd" : "th";
    
    return `${day} the ${dayOfMonth}${suffix} of ${month}, ${year}`;
}