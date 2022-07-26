<!-- 
    this page is an early prototyping of my what to do app
    personalized maps for different activities

 -->
<script context="module">

</script>

<script>
let activity_tabs = ['home', 'golf', 'coffee', 'dinner', 'bike'];
let curr_activity = 'home';
let friends_list = [{name: 'David'}, 
                    {name: 'Bob'}, 
                    {name: 'Chris'}, 
                    {name: 'Will'}, 
                    {name: 'Tom'}, 
                    {name: 'Nikki'}, 
                    {name: 'Barb'}, 
                    {name: 'Nancy'}];
let comments = [{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'},
{user: 1, post_time: '2022-06-28T11:00', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt porttitor consequat. Maecenas a massa vel nibh bibendum molestie sed a sem. Vestibulum aliquam dui fringilla venenatis ullamcorper. Etiam tempus euismod semper. Etiam viverra urna.'}]
</script>

<div class="page_container">

    <div id="main_container">
        <div id="title">
            {curr_activity}
        </div>

<!-- todo
        <div id="recommend">
            
        </div> -->
<!-- todo
        <div id="map">

        </div> -->

        <div id="comments">

        </div>

        <div id="friends_list">

        </div>

        <div id="list">

        </div>

    </div>


    <!--
    pin to bottom of page
    horizontally scrollable
    updates current activity tab
    -->
    <div id="activities_selector_container">
        {#each activity_tabs as curr}
            <div class="activity_selector">
                {curr}
            </div>
        {/each}
    </div>
</div>

<style>

</style>