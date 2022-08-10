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



const processEndBraces = (l, nextItem) => (nextItem !== undefined && nextItem.trim() !== '}') ? `${l},` : l;
const processOpenBraces = (l, index) => (index === 0) ? l :`"${l.slice(0, l.indexOf("{")).trim()}": {`;
const processOther = (l, nexItem) => (nexItem===undefined ||nexItem.trim()==="}")?`"${l}": null`: `"${l}":null,`;



const resultFp = gql.split("\n")
                            .map((l, i, a) => {

                                l = l.trim();
                                return l.endsWith("}") ? 
                                processEndBraces(l, a[i + 1]) : 
                                l.endsWith("{") ? 
                                processOpenBraces(l, i) : 
                                processOther(l, a[i +1])
                            })
                            .join(" ")

console.log("json format : \n\n", resultFp);

console.log("\n____________________________________\n");

console.log(JSON.parse(resultFp));


  

  
