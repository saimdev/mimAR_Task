export const getRandomQuote = async (
    setLoadingQuote,
    quoteApiKey,
    setQuote, 
    setAuthor,
    setQuoteError) => {
  
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes`, {
      method: "GET",
      headers: {
        'X-Api-Key': quoteApiKey,
      },
    });
  
    const data = await response.json();
    console.log(data);
    if(!data){
        setQuoteError("Unable to fetch random quote for you!");
    }
    else{
        setQuote(data[0].quote);
        setAuthor(data[0].author);
    }
    setLoadingQuote(false);
   
  };
  