function parseFromJSON(rawjson){
    console.log("PARSING STUDYSHEET FROM JSON: "+rawjson)
    var recievedStudysheet = Object.assign(new Studysheet, JSON.parse(rawjson));
    recievedStudysheet.parseTerms();
    return recievedStudysheet;
}


class Studysheet {
    
    constructor(name){
        this.name = name;
        this.terms = []
        this.length = 0;
    }
    add(term){
        this.terms.push(term)
        this.length++;

    }
    getNthTerm(n){
        //return just the nth term
        var theTerm = this.terms[n];
        return theTerm;
    }

    returnRawData(){
        return this.terms;
    }

    parseTerms(){
        for (var i = 0; i<this.terms.length; i++){
            if (this.terms[i].isMulti == false){
                var tmpTerm = Object.assign(new Term, this.terms[i]);
                this.terms[i] = tmpTerm;
            } else{
                var theTerm = this.terms[i]
                var tmpTerm = Object.assign(new MultiTerm(theTerm.terms, theTerm.answers, theTerm.question), theTerm);
                this.terms[i] = tmpTerm;
            }
        }
    }

    randomize(){
        for (let i = this.terms.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.terms[i];
            this.terms[i] = this.terms[j];
            this.terms[j] = temp;
        }
    }

    remove(n){
        return this.terms.splice(n, 1);
    }
    
}

class Term {

    constructor(isMulti, term, answer, hasImage){
        console.log("Term Created")
        this.isMulti = isMulti;
        this.term = term;
        this.answer = answer;
        this.hasImage = hasImage;
        var data = {
            "question":term,
            "answer":answer
        }
    }

    returnArray(){
        var arr = [term,answer];
        return arr;
    }

    check(against){
        if (against == this.answer){
            return true;
        }
        return false;
    }

    addImage(src){
        this.imageSrc = src;
    }

    
}

class MultiTerm extends Term{
    

    constructor(terms, answers, question, hasImage){
        super(true, "multi", "multi", hasImage);
        this.terms = terms;
        this.answers = answers;
        this.question = question;
        this.defs = []
        for (var i = 0; i<terms.length; i++){
            var tmpDict = {
                "question":terms[i],
                "answer":answers[i]
            }
            this.defs.push(tmpDict);
        }
        this.length = terms.length;
    }


    multiCheck(against, i){
        if (this.answers[i] == against){
            return true
        }
        return false
    }



}


