import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-typing-test',
  templateUrl: './typing-test.component.html',
  styleUrls: ['./typing-test.component.css'],
  preserveWhitespaces: true,
})

export class TypingTestComponent {
  isFirstKeyPress = true;
  startText = 'Start';
  value: string | undefined;
  remainingText: number = 0;
  totaltext: string | undefined;
  wpm: number = 0;
  counter: number | undefined;
  second: number = 0;
  minute: number= 0;
  hour: number = 0;
  interval1;
  interval2;
  interval3;
  interval4;
  valueChange(value: any) {
    this.totaltext = this.value.split(" ").join("")
    this.remainingText = this.totaltext.length;

  }
  startTimer() {

    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    clearInterval(this.interval4);

    this.interval1 = setInterval(() => {
      if (this.second < 60) {
        this.second++;
      } else {
        this.second = 1;
      }
    }, 1000)

    this.interval2 = setInterval(() => {
      if (this.minute < 60) {
        this.minute++;
      } else {
        this.minute = 1;
      }
    }, 60000)

    this.interval3 = setInterval(() => {
      if (this.hour < 60) {
        this.hour++;
      } else {
        this.hour = 1;
      }
    }, 3600000)

    this.interval4 = setInterval(() => {
      if (this.counter < 500000000000) {
        this.counter++;
        this.wpm = (this.remainingText * 60) / (this.counter * 5);
        this.wpm = Math.trunc(this.wpm);
      } else {
        this.counter = 1;
      }
    }, 1000)
    let startButton = document.getElementById("start");
    startButton.style.display = 'none';
    let pauseButton = document.getElementById('pause');
    pauseButton.style.display = 'block';
  }
  pauseTimer() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    clearInterval(this.interval4);
    this.startText = "resume";
    const textarea = document.getElementById("floatingTextarea2") as HTMLTextAreaElement;
    if (textarea) {
      textarea.focus();
    }
    let startButton = document.getElementById("start");
    startButton.style.display = 'block';
    let pauseButton = document.getElementById('pause');
    pauseButton.style.display = 'none';
    this.isFirstKeyPress = true;
  }
  clearTimer() {
    let startButton = document.getElementById("start");
    startButton.style.display = 'block';
    let pauseButton = document.getElementById('pause');
    pauseButton.style.display = 'none';
    this.startText = 'Start';
    this.counter = 0;
    this.value = undefined;
    this.wpm = 0;
    this.remainingText = 0;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    clearInterval(this.interval4);
    this.isFirstKeyPress = true;
  }
  submit() {
    let textarea = document.getElementById('typingContainer');
    let result = document.getElementById('showResult');
    textarea.style.display = 'none';
    result.style.display = 'block';
    this.pauseTimer();
  }
  showTyping(){
    let textarea = document.getElementById('typingContainer');
    let result = document.getElementById('showResult');
    textarea.style.display = 'block';
    result.style.display = 'none';
    this.clearTimer();
  }
  handleInput(event: Event) {
    if (this.isFirstKeyPress) {
      this.startTimer();
      this.isFirstKeyPress = false;
    }
  }
}