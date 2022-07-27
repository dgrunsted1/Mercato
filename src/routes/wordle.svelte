

<script context="module">
    import { element_is } from "svelte/internal";
    export async function load({ fetch }) {
      const url = `/apis/get_possible_words`;
      const response = await fetch(url);
      return {
        status: response.status,
        props: {
          words: response.ok && (await response.json())
        }
      };
    }
</script>



<script>
        import { onMount } from 'svelte';
        export let words;
        words = words.possible_answers;
        let word = words[Math.floor((Math.random() * words.length) + 1)];
        let chances = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        let word_length = [0, 1, 2, 3, 4];
        let prev_last_of_line = '';
        let guess=[''];
        let last_go_back = 0;
        let alphabet = "abcdefghijklmnopqrstuvxyz".split('');
        let unchosen = alphabet;
        let grey_letters = [''];
        let yellow_letters = [''];
        let green_letters = [''];
        let word_to_add = "";    
    
        let add_word = async function(word_in) {
            if (word_in.length == 5){
                const url = '/apis/add_word';
                const response = await fetch(url, {
                    method: "post",
                    body: JSON.stringify({
                        word: word_in
                    })
                });
                if (response.ok) {
                    alert(`${word_to_add} added to word list!`);
                } else {
                    alert("word exists" + response.status);
                }
            }else {
                alert("word is not 5 letters");
            }
            
            word_to_add = "";
        }
        let getNext = function(row, column){
            let row_items = document.getElementsByClassName(row);
            let result;
            let next;
            let curr_classes = [];
    
            for (var i=0, max=row_items.length; i < max; i++) {
                curr_classes = row_items[i].className.split(' ');
                if (next == 1 && row_items[i]) return row_items[i];
                else if (curr_classes.includes(column)) next = 1;
            }
            return false;
        }
    
        let is_right_answer = function(colummn_in, row_in){
            let result = true;
            for (var j=0, max=guess.length; j < max; j++) {
                let color = get_color(guess[j], j, colummn_in);
                let curr =  get_element(j, row_in);
                curr.classList.add(color);
                if (!color.includes('green')) result = false;
            }
            return result;
        }
    
        let get_color = function(letter, index, column){
            unchosen = unchosen.filter(curr => curr !== letter);
            let word_array = word.split("");
            if (word_array[index] == letter){
                if (!green_letters.includes(letter)){
                    yellow_letters = yellow_letters.filter(curr=> curr != letter);
                    green_letters.push(letter);
                    green_letters = green_letters;
                }
                return "green";
            }
            for (let i = 0; i < word_array.length; i++){
                if (word_array[i] == letter){
                    if (!yellow_letters.includes(letter)){
                        yellow_letters.push(letter);
                        yellow_letters = yellow_letters;
                    }
                    return "yellow";
                }
            }
            if (!grey_letters.includes(letter)){
                grey_letters.push(letter);
                grey_letters = grey_letters;
            }
            return "grey";
        }
    
        let get_element = function(column_in, row_in){
            let curr_row = document.getElementsByClassName(row_in);
            for (let i = 0; i < curr_row.length; i++){
                let curr_classes = curr_row[i].className.split(' ');            
                if (curr_classes.includes(column_in.toString())) return curr_row[i];
            }
            return false;
        }
    
        let winner = function(row){
            let guesses = {'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5', 'f': '6'};
            setTimeout(function(){ alert(`You Win!\nIt only took you ${guesses[row]} guesses!`)},100);
        }
    
        function end_of_game(){
            alert("the word was <b>"+word+"</b> stupid");
        }
        
        let onKeyUpHandler = function(e){
            let classes = this.className.split(' ');
            let row = classes[0];
            let column = classes[1];
            let key = e.key;
            
            if (column == 0){
    
                if (key.length === 1){
                    
                    let next = getNext(row, column);
                    if (next && this.value){
                        guess[column] = key;
                        next.focus();
                    }
                }
    
            }else if (column == word_length[word_length.length - 1]){
                if (key.length === 1){
                    last_go_back = 1;
                    guess[column] = key;
                }else if (key == 'Backspace'){
                    
                    if (last_go_back){
                        guess[column] = '';
                        last_go_back--;
                    }else {
                        let prev_index = word_length.indexOf(parseInt(column)) - 1;
                        let prev = get_element(word_length[prev_index], row);
                        prev.value = '';
                        guess[prev_index] = '';
                        prev.focus();
                    }
                    if (guess){
                    }
                }else if (key == 'Enter'){
                    if (words.includes(guess.join(''))){
                        if (is_right_answer(column, row)) winner(row);
                        else if (chances[chances.length - 1] == row) end_of_game();
                        else {
                            let next_row_element = get_element(chances[chances.indexOf(row) + 1], '0');
                            if (next_row_element) next_row_element.focus();
                        }
                        guess = [];
                    }else {
                        alert("word not in word list");
                    }
                }
            }else {
                if (key.length === 1){
                    guess[column] = key;
                    let next = getNext(row, column);
                    if (next && this.value) next.focus();
                }else if (key == 'Backspace'){
                    let prev_index = word_length.indexOf(parseInt(column)) - 1;
                    let prev = get_element(word_length[prev_index], row);
                    prev.value = '';
                    guess[prev_index] = '';
                    prev.focus();
                    if (guess){
                    }
                }
            }
            prev_last_of_line = key;
            
        }
    
        onMount(async () => {
            let first_element = get_element(0, 'a');
            if (first_element) first_element.focus();
        });
    
</script>
    
    
    
    
    
    
            <div id="board">
                <ul>
                    {#each chances as i}
                    <li><ul class="row">
                        {#each word_length as j}
                        <li><input type="text" class="{i} {j}" maxlength="1" on:keyup={onKeyUpHandler}/></li>
                        {/each}
                    </ul></li>
                    {/each}
                </ul>
            </div>
    
    
            <div id="letters">
                <div class="letters" id="green_letters">
                    <ul>
                        {#each green_letters as green}
                        <li>{green}</li>
                        {/each}
                    </ul>
                </div>
                <div class="letters" id="yellow_letters">
                    <ul>
                        {#each yellow_letters as yellow}
                            <li>{yellow}</li>
                        {/each}
                    </ul>
                </div>
                <div class="letters" id="grey_letters">
                    <ul>
                        {#each grey_letters as grey}
                            <li>{grey}</li>
                        {/each}
                    </ul>
                </div>
                <div class="letters" id="unchosen">
                    <ul>
                        {#each unchosen as curr}
                            <li>{curr}</li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div id="add_word">
                <label for="add_word">missing word?</label>
                <input type="text" bind:value={word_to_add} id="add_word_input" name="add_word">
                <input type="submit" value="add word" on:click={add_word(word_to_add)}>
            </div>
    
    
    
    
    
    <style>
        ul {
            list-style-type: none;
            padding:0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    
        .row {
            display: flex;
            flex-direction: row;
            width: 100%;
        }
        
        input {
            width: 1em;
            margin: 5px;
            text-align: center;
            font-size: 65px;
            text-transform: uppercase;
            padding:0;
            box-shadow: 5px 5px 1px 1px #858585;
        }
    
        #board {
            width: 100%;
        }
    
        .grey {
            background-color: #cccccc;
        }
    
        .yellow {
            background-color: #fffa96;
        }
    
        .green {
            background-color: rgb(90, 193, 90);
        }
    
        .letters ul {
            flex-direction: row;
            margin:0;
            padding: 5px 0;
        }
        .letters li {
            padding: 0px 5px;
        }
        .letters{
            width:300px;
            margin: auto;
        }
        #green_letters {
            background-color: rgb(90, 193, 90);
        }
        #yellow_letters {
            background-color: #fffa96;
        }
        #grey_letters {
            background-color: #cccccc;
        }

        #add_word > input[type='text'] {
            width: 130px;
            margin: 5px;
            text-align: center;
            font-size: 16px;
        }

        #add_word > input[type='submit'] {
            width: 80px;
            margin: 5px;
            text-align: center;
            font-size: 16px;
        }
    </style>