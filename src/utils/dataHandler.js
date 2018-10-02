export function arrangeComments(a) {

  let cardComments = [];
  let alreadyCheckedIDS = [];
  let alreadyChecked = false;
  let temp_comments = [];

  let mCurrent;
  // console.log(JSON.stringify(a))
  for (let i=0; i < a.length; i++) {
    mCurrent = a[i];
    alreadyChecked = false;
    if(alreadyCheckedIDS && alreadyCheckedIDS.includes(mCurrent.cardId)) {
      alreadyChecked = true;
    }

    if(!alreadyChecked){
      for(let j=0; j<a.length; j++){
        if(mCurrent.cardId === a[j].cardId){

          let exists = false;

          cardComments.map(item=>{

            if(item.card === mCurrent.cardId){
              exists = true;
              temp_comments = item.comments || [];
            }
          });

          temp_comments.push(a[j].message);


          if(!exists){

            cardComments.push({
              card: mCurrent.cardId,
              comments: temp_comments
            });
          } else {
            cardComments.map(item=> {
              if(item.card === mCurrent.cardId){
                comments: temp_comments
              }
            })
          }

        }
      }
    }

    temp_comments = [];

    alreadyCheckedIDS.push(mCurrent.cardId);
  }

  return cardComments;
}
