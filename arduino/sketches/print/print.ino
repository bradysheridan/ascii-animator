#include "Adafruit_Thermal.h"
#include "image.h"
#include "SoftwareSerial.h"
#define TX_PIN 6 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 5 // Arduino receive   GREEN WIRE   labeled TX on printer

SoftwareSerial mySerial(RX_PIN, TX_PIN); // Declare SoftwareSerial obj first
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor

void setup() {
  pinMode(7, OUTPUT);
  digitalWrite(7, LOW);

  // init SoftwareSerial
  mySerial.begin(19200);

  // init printer (same regardless of serial type)
  printer.begin();        

  // pad start
  #ifdef PAD_START
    Serial.print("padding start");
    printer.feed(10);
  #endif

  // print
  printer.printBitmap(image_width, image_height, image_data);

  // pad end
  #ifdef PAD_END
    Serial.print("padding end");
    printer.feed(10);
  #endif

  printer.sleep();      // Tell printer to sleep
  delay(3000L);         // Sleep for 3 seconds
  printer.wake();       // MUST wake() before printing again, even if reset
  printer.setDefault(); // Restore printer to defaults
}

void loop() {
}
