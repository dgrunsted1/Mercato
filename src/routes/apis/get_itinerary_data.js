
export async function get(){
    let input_data = {"activity": 
                    [[{"name": "Title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "date"}, {"name": "end", "type": "date"}, {"name": "location", "type": "text"}, {"name": "link", "type": "text"}]]
                , "travel": 
                    [[{"name": "Title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "date"}, {"name": "end", "type": "date"}, {"name": "departure location", "type": "text"}, {"name": "arrival location", "type": "text"}, {"name": "link", "type": "text"}]]
                , "stay": 
                    [[{"name": "Title", "type": "text"}, {"name": "description", "type": "text"}], [{"name": "start", "type": "date"}, {"name": "end", "type": "date"}, {"name": "location", "type": "text"}, {"name": "link", "type": "text"}]]
                };
    return {
        body: { input_data }
    };
}