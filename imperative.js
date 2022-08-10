const gql = `{
    country {
      name
      geolocation {
          area
      }
      state { 
          enName
          city {
              name
              enName
          }
      }
      city {
          name
          enName
      }
    }
  }`;


  let lines = gql.split("\n");
  
  function parse(lines)
  {
      lines.forEach((element,index, array) => {

        if(element.trim()[0]!=="}" && index!==0)
          {
            // add " at beginning of each word in every line
            const firstNonSpace = element.search(/\S/);
            array[index]= element.slice(0, firstNonSpace) + "\"" + element.trim();


            if(array[index][array[index].length-1] !== '{')
            {
                array[index] += "\" : null";
                if(array[index + 1].trim() !== '}')
                {
                    array[index] += ' ,';
                }
            }
            else
            {

                const openCurlyBrace = array[index].indexOf('{');
                const result = array[index].slice(0, openCurlyBrace).trim();
                array[index] = array[index].slice(0, firstNonSpace) + result + "\" : {";

            }
          }

          if(array[index].trim() === '}' && index!==-1 && index!== array.length-1)
          {
            if(array[index + 1].trim() !== '}')
            {
                
                array[index] += ' ,';
            }
          }
        });
      
    }

parse(lines);


let result = "";
for(line of lines)
{
    result+=line;
    result+='\n';
}

for(line of lines)
{
    console.log(line);
}

console.log("\n_______________________________________\n");

console.log(JSON.parse(result));


