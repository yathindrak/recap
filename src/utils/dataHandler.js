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


export function arrangeCardVotes(votes)
{
  var cardVotes = [];
  var alreadyVotedIDS = [];
  var alreadyChecked = false;

  var mCurrent, likes_count;
  for (var i=0; i < votes.length; i++) {
    likes_count = 0;
    mCurrent = votes[i];
    alreadyChecked = false;


    if(alreadyVotedIDS && alreadyVotedIDS.includes(mCurrent.cardId)) {
      alreadyChecked = true;
    }

    if(!alreadyChecked){
      for(var j=0; j<votes.length; j++){
        if(mCurrent.cardId === votes[j].cardId){

          var exists = false;

          cardVotes.map(item=>{

            if(item.card === mCurrent.cardId){
              exists = true;
            }
          });

          if(!exists){

            cardVotes.push({
              card: mCurrent.cardId,
              likes: ++likes_count
            });
          } else {

            cardVotes.map(item=> {
              if(item.card === mCurrent.cardId){
                ++item.likes;
                console.log(JSON.stringify(item));
              }
            })
          }
        }
      }
    }

    alreadyVotedIDS.push(mCurrent.cardId);
  }

  return cardVotes;
}
