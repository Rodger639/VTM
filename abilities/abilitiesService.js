var app = angular.module("site");

app.service("AbilitiesService",
['CharCreatorService',
 function(CharCreatorService){

   this.loadedCharacter = false;
   this.freeAbility = freeAbility;
   this.priorityChange = priorityChange;
   this.selectAbility = selectAbility;
   this.getPriority = getPriority;
   this.getPriorityPts = getPriorityPts;
   this.resetAbilities = resetAbilities;
   this.resetPriorities = resetPriorities;
   this.setCustomAbility = setCustomAbility;
   this.abilityPriorities = ["Первичные", "Вторичные", "Третичные"];
   this.abilitiesPage = "./abilities/abilities.html";
   this.abilityPtsTotal = 27;
   this.primaryPts = 13;
   this.secondaryPts = 9;
   this.tertiaryPts = 5;
   this.selectedPriorities = [null, null, null];
   this.abilitiesList = {};

   class Ability {
     constructor(name, id){
       this.name = name;
       if(id != null){
         this.id = id;
       }
       this.pointCount = 0;
       this.points = [{id: 0, img: "./empty.png", type: ""},
                      {id: 1, img: "./empty.png", type: ""},
                      {id: 2, img: "./empty.png", type: ""},
                      {id: 3, img: "./empty.png", type: ""},
                      {id: 4, img: "./empty.png", type: ""}];

       this.reset = function(){
         //Reset name for custom abilities on load, then load names if they exist.
         if(this.id != null){
           this.name = "";
         }
         this.points.forEach(function(ability){
           ability.img = './empty.png';
           ability.type = "";
         });
         this.pointCount = 0;
       };

       this.select = function(index, type){
         if(index == -1){
           this.reset();
           return;
         }
         if(this.points[index].img=="./full.png" ||
            this.points[index].img=="./free.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              return;
            }
            else{
              point.img = "./empty.png";
              point.type = "";
            }
          });
        }
        if(this.points[index].img == "./empty.png"){
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(type == "freebie" && point.img != "./full.png"){
                point.img = "./free.png";
                point.type = "freebie";
              }
              else{
                point.img = "./full.png";
                point.type = "original";
              }
            }
          });
        }
       };
     }
   };
   this.alertness = new Ability("Бдительность");
   this.abilitiesList.alertness = this.alertness;
   this.athletics = new Ability("Атлетика");
   this.abilitiesList.athletics = this.athletics;
   this.awareness = new Ability("Хитрость");
   this.abilitiesList.awareness = this.awareness;
   this.brawl = new Ability("Драка");
   this.abilitiesList.brawl = this.brawl;
   this.empathy = new Ability("Эмпатия");
   this.abilitiesList.empathy = this.empathy;
   this.expression = new Ability("Экспрессия");
   this.abilitiesList.expression = this.expression;
   this.intimidation = new Ability("Запугивание");
   this.abilitiesList.intimidation = this.intimidation;
   this.leadership = new Ability("Лидерство");
   this.abilitiesList.leadership = this.leadership;
   this.streetwise = new Ability("Знание Улиц");
   this.abilitiesList.streetwise = this.streetwise;
   this.subterfuge = new Ability("Уклонение");
   this.abilitiesList.subterfuge = this.subterfuge;
   this.customtalent = new Ability('', 'customtalent');
   this.abilitiesList.customtalent = this.customtalent;
   this.animalken = new Ability("Знание животных");
   this.abilitiesList.animalken = this.animalken;
   this.crafts = new Ability("Ремесла");
   this.abilitiesList.crafts = this.crafts;
   this.drive = new Ability("Вождение");
   this.abilitiesList.drive = this.drive;
   this.etiquette = new Ability("Этикет");
   this.abilitiesList.etiquette = this.etiquette;
   this.firearms = new Ability("Стрельба");
   this.abilitiesList.firearms = this.firearms;
   this.larceny = new Ability("Безопасность");
   this.abilitiesList.larceny = this.larceny;
   this.melee = new Ability("Ближний бой");
   this.abilitiesList.melee = this.melee;
   this.performance = new Ability("Исполнение");
   this.abilitiesList.performance = this.performance;
   this.stealth = new Ability("Скрытность");
   this.abilitiesList.stealth = this.stealth;
   this.survival = new Ability("Выживание");
   this.abilitiesList.survival = this.survival;
   this.customskill = new Ability('', 'customskill');
   this.abilitiesList.customskill = this.customskill;
   this.academics = new Ability("Академические знания");
   this.abilitiesList.academics = this.academics;
   this.computer = new Ability("Компьютер");
   this.abilitiesList.computer = this.computer;
   this.finance = new Ability("Финансы");
   this.abilitiesList.finance = this.finance;
   this.investigation = new Ability("Расследование");
   this.abilitiesList.investigation = this.investigation;
   this.law = new Ability("Правоведение");
   this.abilitiesList.law = this.law;
   this.medicine = new Ability("Медицина");
   this.abilitiesList.medicine = this.medicine;
   this.occult = new Ability("Оккультизм");
   this.abilitiesList.occult = this.occult;
   this.politics = new Ability("Политика");
   this.abilitiesList.politics = this.politics;
   this.science = new Ability("Наука");
   this.abilitiesList.science = this.science;
   this.technology = new Ability("Лингвистика");
   this.abilitiesList.technology = this.technology;
   this.customknowledge = new Ability('', 'customknowledge');
   this.abilitiesList.customknowledge = this.customknowledge;

   this.abilityCategories = [
     {
       id: 0, category: "talents", priority: null,
       abilities:
       [
         this.alertness, this.athletics, this.awareness, this.brawl,
         this.empathy, this.expression, this.intimidation, this.leadership,
         this.streetwise, this.subterfuge, this.customtalent
       ]
    },
    {
      id: 1, category: "skills", priority: null,
      abilities:
      [
        this.animalken, this.crafts, this.drive, this.etiquette, this.firearms,
        this.larceny, this.melee, this.performance, this.stealth, this.survival, this.customskill
      ]
    },
    {
      id: 2, category: "knowledges", priority: null,
      abilities:
      [
        this.academics, this.computer, this.finance, this.investigation,
        this.law, this.medicine, this.occult, this.politics, this.science,
        this.technology, this.customknowledge
      ]
    }];

    function getPriority(ability){
     for(var i = 0; i < this.abilityCategories.length; i++){
       if(this.abilityCategories[i].abilities.indexOf(ability)!=-1){
         return this.selectedPriorities[i];
       }
     }
    }

    function getPriorityPts(priority){
     switch(priority){
       case "Первичные":
         return this.primaryPts;
         break;
       case "Вторичные":
         return this.secondaryPts;
         break;
       case "Третичные":
         return this.tertiaryPts;
         break;
       default:
         break;
     }
    };

    function freeAbility(ability, index, catIndex){
      if(index == 0 && ability.pointCount == 1){
        ability.reset();
      }
      else{
        ability.pointCount=(index+1);
        ability.select(index, "original");
      }
    };

    function selectAbility(ability, index){

      var priortyPts = 0;
      var pointDiff = 0;

      var priority = this.getPriority(ability);

      //Different operations if using Freebie points.
      if(CharCreatorService.freebieMode){

        if(ability.points[index].type == "original")
          return null;

        priorityPts = CharCreatorService.getFreebiePts();

        if(index < ability.pointCount - 1)
          pointDiff = (ability.pointCount * 2) - ((index + 1) * 2);
        if((index == ability.pointCount-1)){
          pointDiff = (ability.pointCount * 2) - (index * 2);
           index -= 1;
        }
        else if(index > ability.pointCount-1)
          pointDiff = ((ability.pointCount-1) * 2) + (-2 * index);

        if(priorityPts + pointDiff < 0)
          return null;

        CharCreatorService.changeFreebiePts(pointDiff);
        ability.pointCount = (index+1);
        ability.select(index, "freebie");
        return;
      }
      else{
         priorityPts = this.getPriorityPts(priority);
         var pointDiff = ability.pointCount - (index+1);
      }

      if(priority==null || (!CharCreatorService.freebieMode && index >= 3)){
       return null;
      }

      //Do math to make sure they can't spend points they don't have,
      //even when priorityPts isn't equal to 0.
      //Case example: increase 3 pts when priorityPts = 2.
      if((priorityPts+pointDiff < 0)){
       return null;
      }

      if(index == 0 && ability.pointCount == 1){
        ability.pointCount = 0;
        pointDiff = 1;
        index = -1;
      }
      else{
        //Change the point count in the ability.
        ability.pointCount = (index+1);
      }


      //Change the total amount of points still available for that category.
      switch(priority){
       case "Первичные":
         this.primaryPts += pointDiff;
         break;
       case "Вторичные":
         this.secondaryPts += pointDiff;
         break;
       case "Третичные":
         this.tertiaryPts += pointDiff;
         break;
       default:
         break;
      }
      this.abilityPtsTotal += pointDiff;
      //Fill in the dots!
      ability.select(index, "original");
    };

    function priorityChange(changedPriority, id, prevPriority){
      this.abilityCategories[id].priority = changedPriority;
      for(var i = 0; i < this.selectedPriorities.length; i++){
        if(changedPriority == this.selectedPriorities[i] && id != i){
          this.selectedPriorities[i] = null;
          this.abilityCategories[i].abilities.forEach(function(abil){
            abil.reset();
          });
        }
      }
        //Reset the dots.
        this.abilityCategories[id].abilities.forEach(function(abil){
          abil.reset();

        });
        //Reset the point values.
        if(prevPriority == "Первичные"){
          this.primaryPts = 13;
        }
        if(prevPriority == "Вторичные"){
          this.secondaryPts  = 9;
        }
        if(prevPriority == "Третичные"){
          this.tertiaryPts = 5;
        }
        if(changedPriority == "Первичные"){
          this.primaryPts = 13;
        }
        if(changedPriority == "Вторичные"){
          this.secondaryPts = 9;
        }
        if(changedPriority == "Третичные"){
          this.tertiaryPts = 5;
        }
    };

    function resetAbilities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.abilities.forEach(function(ab){
          ab.reset();
        });
      });
    };

    function resetPriorities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.priority = null;
      });
      this.primaryPts = 13;
      this.secondaryPts = 9;
      this.tertiaryPts = 5;
    };

    function setCustomAbility(ability, name){
      if(ability == this.customtalent){
        this.customtalent.name = name;
      }
      else if(ability == this.customskill){
        this.customskill.name = name;
      }
      else{
        this.customknowledge.name = name;
      }
    };

}]);
