class Studysheet {
    
    constructor(name){
        this.name = name;
        this.terms = []
        
    }
    add(term){

        
        this.terms.push(term)

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
    
}

class Term {

    constructor(isMulti, term, answer){
        console.log("Term Created")
        this.isMulti = isMulti;
        this.term = term;
        this.answer = answer;
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

    
}

class MultiTerm extends Term{
    

    constructor(terms, answers, question){
        super(true);
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
        if (defs[i].get("question") == against){
            return true
        }
        return false
    }



}


