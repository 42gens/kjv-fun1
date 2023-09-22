function loadBook2() {
    // First, clear the current content from the columns
    const leftColumn = document.getElementById("left-column");
    const rightColumn = document.getElementById("right-column");

    leftColumn.innerHTML = "";
    rightColumn.innerHTML = "";

    // Fetch content from book2.json
    fetch('questionskjv1.json')
        .then(response => response.json())
        .then(data => {
            // Iterate over each item in the data array with index
            data.forEach((item, index) => {
                // Create a card for each item's content
                const card = document.createElement('div');
                card.className = 'card';

                const question = document.createElement('h2');
                question.textContent = item.Question;

                const answer = document.createElement('p');
                answer.textContent = item.Answer;

                card.appendChild(question);
                card.appendChild(answer);

                // Check the index to decide which column to place the card
                if (index % 2 === 0) {
                    leftColumn.appendChild(card); // Even indices go to the left column
                } else {
                    rightColumn.appendChild(card); // Odd indices go to the right column
                }
            });
        });
}
