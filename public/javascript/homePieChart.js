const chartEl = document.querySelector('#myChart').getContext('2d');

const getPostCount = async function () {

    const response = await fetch('/api/posts/count', {
        method: 'GET'
    });

    if (response.ok) {
        const countData = await response.json();
        console.log(countData);

        const encouragementPosts = countData.encouragementPosts;
        const gripePosts = countData.totalPosts - encouragementPosts;
        console.log(`ep: ${encouragementPosts} and gp: ${gripePosts}`);

        let myChart = new Chart(chartEl, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [encouragementPosts, gripePosts],
                    backgroundColor: ['#00FF00', '#000000']
                }],
                labels: ['Encouragements', 'Gripes']
            }
        })
    }


};

getPostCount();

console.log('hello!');