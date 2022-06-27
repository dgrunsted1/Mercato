
export async function get(){
    let input_data = {"activity": 
                    [[{"name": "title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "datetime-local"}, {"name": "end", "type": "datetime-local"}, {"name": "location", "type": "text"}, {"name": "link", "type": "text"}]]
                , "travel": 
                    [[{"name": "title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "datetime-local"}, {"name": "end", "type": "datetime-local"}, {"name": "departure location", "type": "text"}, {"name": "arrival location", "type": "text"}, {"name": "link", "type": "text"}]]
                , "stay": 
                    [[{"name": "title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "datetime-local"}, {"name": "end", "type": "datetime-local"}, {"name": "location", "type": "text"}, {"name": "link", "type": "text"}]]
                };
    return {
        body: { input_data }
    };
}