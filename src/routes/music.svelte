<script context="module">
    export async function load({ fetch }) {
    //   const url = `/apis/get_itinerary_data`;
      const url = `/apis/test`;
      const response = await fetch(url);
        // console.log(response);
        return {
        status: response.status,
        props: {
            input_data: response.ok && (await response.json())
        }
      };
    }
  </script>
<script>
export /**
            * @type {{ [x: string]: any; input_data: any; }}
            */
     let input_data;
    input_data = input_data.input_data;
    input_data = input_data;
</script>



<p>{input_data}</p>




<style>

</style>