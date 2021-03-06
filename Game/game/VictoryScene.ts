﻿ 
class VictoryScene extends ex.Scene {

   constructor() {
      super();
   }

   public onInitialize(engine: ex.Engine): void {
      super.onInitialize(engine);

      //var victoryKraken = new Kraken();
      //this.addChild(victoryKraken);

      game.camera = new ex.BaseCamera(engine);
      //game.camera.setActorToFollow(victoryKraken);

      var w = game.getWidth();
      var h = game.getHeight();

      var level0Scene = (<any>game).sceneHash["level0"];
      var stats = level0Scene.stats;

      var boatsDestroyed = stats.numBoatsDestroyed;
      var damageTaken = stats.damageTaken;
      var healthGained = stats.healthGained;

      var grade = "C";

      var enemiesDestroyedPercentage = 1 - ((stats.numBoats - boatsDestroyed)/stats.numBoats);
      //var damageTakenState = 
      //var healthGainedStat =
      var originalHealth = Config.defaultKrakenHealth;
      var finalHealth = Config.defaultKrakenHealth + healthGained - damageTaken;
      var healthPercentage = 1 - ((originalHealth - finalHealth) / originalHealth); //TODO calculate maximum possible score for "perfect" rank

      var aggregateScore = (enemiesDestroyedPercentage + healthPercentage) / 2;

      if (aggregateScore > 0.5) {
         grade = "B";
      } 
      if (aggregateScore > 0.8) {
         grade = "A";
      }
      if (aggregateScore > 1) {
         grade = "S";
      }
      if (aggregateScore > 1.5) {
         grade = "S+";
      }

      // Analytics events
      var analytics = (<any>window).ga;
      if (analytics) {
         analytics('send', 'event', 'Gameover', 'level0', 'Win', { 'nonInteraction': 1 });
         analytics('send', 'event', 'WinStats', 'level0', 'Aggregate Score', { 'eventValue': Math.round(aggregateScore * 100), 'nonInteraction': 1 });
         analytics('send', 'event', 'WinStats', 'level0', 'Boats Destroyed', { 'eventValue': boatsDestroyed, 'nonInteraction': 1 });
         analytics('send', 'event', 'WinStats', 'level0', 'Damage Taken', { 'eventValue': damageTaken, 'nonInteraction': 1 });
         analytics('send', 'event', 'WinStats', 'level0', 'Health Gained', { 'eventValue': healthGained, 'nonInteraction': 1 });
      }

      var splash = new ex.Actor(0, 0, game.width, game.height);
      splash.addDrawing("bg", new ex.Sprite(Resources.VictoryTexture, 0, 0, game.width, game.height));
      this.addChild(splash);

      //var labelVictory = new ex.Label("Game Complete!", w / 2, 150, '90px Iceland');
      //labelVictory.color = ex.Color.Red;
      //labelVictory.textAlign = ex.TextAlign.Center;
      //this.addChild(labelVictory);

      var labelBoatsDestroyed = new ex.Label("boats destroyed     " + boatsDestroyed, w/2, 350, '50px Iceland');
      labelBoatsDestroyed.color = ex.Color.White;
      labelBoatsDestroyed.textAlign = ex.TextAlign.Center;
      this.addChild(labelBoatsDestroyed);

      var labelDamageTaken = new ex.Label("damage taken     " + damageTaken, w/2, 400, '50px Iceland');
      labelDamageTaken.color = ex.Color.White;
      labelDamageTaken.textAlign = ex.TextAlign.Center;
      this.addChild(labelDamageTaken);

      var labelHealthGained = new ex.Label("health gained     " + healthGained, w / 2, 450, '50px Iceland');
      labelHealthGained.color = ex.Color.White;
      labelHealthGained.textAlign = ex.TextAlign.Center;
      this.addChild(labelHealthGained);

      var labelGrade = new ex.Label("grade     " + grade, w / 2, 550, '75px Iceland');
      labelGrade.color = ex.Color.White;
      labelGrade.textAlign = ex.TextAlign.Center;
      this.addChild(labelGrade);

      //var labelDetected = new ex.Label("avoided detection     " , w / 2, 300, '50px Iceland');
      //labelDetected.color = ex.Color.White;
      //labelDetected.textAlign = ex.TextAlign.Center;
      //this.addChild(labelDetected);

      //var damageDealt = new ex.Label("damage dealt", w/2, 450, '50px Iceland');
      //boatsDestroyed.color = ex.Color.White;
      //boatsDestroyed.textAlign = ex.TextAlign.Center;
      //this.addChild(boatsDestroyed);

   }

}
