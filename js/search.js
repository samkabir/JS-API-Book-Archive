const loadBooks = () => {

    const noBooksdiv = document.getElementById("displayNoBooks");
    noBooksdiv.innerHTML = '';
    const totalBooks = document.getElementById("displayNumberOfBooks");
    totalBooks.innerHTML=``;

    const searchText = document.getElementById("input-field");
    const searchTextInput = searchText.value;
    const url = `http://openlibrary.org/search.json?q=${searchTextInput}`;
    searchText.value = "";
    const booksdiv1 = document.getElementById("displayTenBooks");
    booksdiv1.innerHTML = ``;
    // Loading Books
    fetch(url)
    .then(res => res.json())
    .then(books => displayBooks(books));
}

const displayBooks = books =>{
    console.log(books);
    const booksdiv = document.getElementById("displayTenBooks");
    const noBooksdiv = document.getElementById("displayNoBooks");
    // noBooksdiv.innerHTML = '';
    // Checking if empty no books found
    if (books.numFound === 0) {
        const noBooks = document.createElement("div");
        noBooks.classList.add('text-center');
        noBooks.innerHTML = `
            <h2 class="text-white">No books found. Please try again.</h2>
        `;
        noBooksdiv.appendChild(noBooks);
    } else {
        // Display Total Number of Books
        const totalBooks = document.getElementById("displayNumberOfBooks");
        // totalBooks.innerHTML=``;
        const divtotal = document.createElement('div');
        divtotal.classList.add('text-center');
        divtotal.innerHTML=`
            <h5 class="text-white">Showing maximum 12 of the ${books.numFound} books found.</h5>
        `
        totalBooks.appendChild(divtotal);
        
        
        //Display Search Result
        let loopCount = 0;
        books.docs.forEach(book => {
            if (loopCount < 12){
                const div = document.createElement('div');
                div.classList.add('col-md-4');
                div.innerHTML=`
                    <div class="card mb-3 shadow-lg bg-white rounded" style="max-width: 540px; min-height: 300px;">
                        <div class="row g-0">
                            <div class="col-md-4 align-middle">
                                <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start " alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${book.title}</h5>
                                    <p class="card-text">Author: ${book.author_name[0]}</p>
                                    <p class="card-text">Publisher: ${book.publisher[0]}</p>
                                    <p class="card-text">First Published: ${book.publish_date[0]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                booksdiv.appendChild(div);
                
                loopCount++;
            }
            else{
            }
        });
    }
}