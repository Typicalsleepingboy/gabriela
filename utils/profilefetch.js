async function fetchEllaData() {
    try {
        let apiUrl = "https://api.crstlnz.my.id/api/member/ella";
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('total-live').textContent = `Showroom: ${data.stats.total_live.showroom}, IDN: ${data.stats.total_live.idn}`;
        const mostGiftRupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.stats.most_gift.gift);
        document.getElementById('most-gift').textContent = `${mostGiftRupiah}`;

        const duration = data.stats.longest_live.duration;
        const seconds = Math.floor(duration / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        let durationString = '';
        if (hours > 0) {
            durationString += `${hours} jam `;
        }
        if (minutes % 60 > 0) {
            durationString += `${minutes % 60} menit `;
        }
        if (seconds % 60 > 0) {
            durationString += `${seconds % 60} detik`;
        }

        document.getElementById('longest-live').textContent = `${durationString.trim()}`;

        document.getElementById('last-live-date').textContent = new Date(data.stats.last_live.date.start).toLocaleDateString();

        const upcomingTheaterContainer = document.getElementById('upcoming-theater');
        if (data.upcomingTheater.length > 0) {
            data.upcomingTheater.forEach(theater => {
                const theaterCard = `
                    <div class="card-bg p-8 hover-scale" data-aos="fade-up" data-aos-delay="100">
                        <h3 class="text-2xl font-bold mb-6" style="color: var(--primary-blue);">${theater.name}</h3>
                        <p>Date: ${new Date(theater.date).toLocaleDateString()}</p>
                        <a href="${theater.url}" target="_blank" class="text-blue-500 underline">See Details</a>
                    </div>
                `;
                upcomingTheaterContainer.innerHTML += theaterCard;
            });
        } else {
            upcomingTheaterContainer.innerHTML = `
                <div class="card-bg p-8 hover-scale text-center" data-aos="fade-up" data-aos-delay="100">
                    <p class="text-2xl font-bold text-blue-500 ">No upcoming performances at the moment.</p>
                </div>
            `;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchEllaData);