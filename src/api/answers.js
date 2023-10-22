import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {{ SkillName: string; Intents: Intent[]; }[]}
 */
export function getSkillsWithIntents() {
  // extract domain in const
  // const res = request({
  //   url: authorizedBackendUrl + 'skillsWithIntentNames',
  //   method: 'get',
  // })
  const res = [
    {
      "SkillName": "Zahlungen",
      "Intents": [
        {
          "name": "Abrechnungsturnus ändern",
          "intent": "AP_changeBillingPeriod",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wäre eine Umstellung des Abrechnungsturnus auf 6 Monate möglich?",
            "Wie ändere ich meine Abrechnungsperiode?",
            "Wie ändere ich meine Abschlagsperiode."
          ],
          "description": "Der Kunde möchte seinen Abrechnungszeitraum (jährlich, monatlich, ...) oder -zeitpunkt (Stichtag) anpassen.",
          "texts": [
            {
              "text": "Du möchtest deinen **Abrechnungszeitraum ändern** oder möchtest eine **Zwischenabrechnung anfordern**? Das kannst schnell und bequem online in deinem Kundenportal beantragen 👇\n\n\nFalls Du eine **Zwischenrechnung anfordern** möchtest, lese bitte zunächst deinen Zählerstand zum gewünschten Rechnungsdatum ab und teile mir diesen mit. Wir kümmern uns dann um den Rest.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Kundenportal ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Abschlag ändern",
          "intent": "AP_changeAmount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Können Sie mir erklären, wie ich den Abschlag bei Ihnen ändern kann?",
            "Kann man den Abschlag ändern nach dem Umzug?",
            "Kann ich meinen Abschlag ändern?"
          ],
          "description": "Der Kunde möchte seinen Abschlag ändern.",
          "texts": [
            {
              "text": "Alles klar. Jetzt brauchen wir deine **Vertragsnummer** (Testvertragsnr: 1 oder 2):",
              "buttons": null
            },
            {
              "text": "✅ Ja",
              "buttons": null
            },
            {
              "text": "Aber gerne doch 🤗! Um den Abschlag zu erfassen, benötige ich folgende Informationen:\n\n1️⃣ Vertragsnummer \\\n2️⃣ Geburtsdatum \\\n3️⃣ Gewünschte Abschlagshöhe \\\n4️⃣ Änderungsdatum\n\n💡 Hast du alle Daten bereit und möchtest fortfahren? Dann klicke auf **Ja** 🙂",
              "buttons": null
            },
            {
              "text": "Gib jetzt bitte dein **Geburtsdatum** ein (Für Testzwecke verwende bitte den 10.10.1910 als Geburtsdatum 😉):",
              "buttons": null
            },
            {
              "text": "Der Vertrag mit dieser **Vertragsnummer** wurde nicht gefunden.❌",
              "buttons": null
            },
            {
              "text": "Wie hoch soll der monatliche Abschlag sein (in Euro)?",
              "buttons": null
            },
            {
              "text": "Ab wann soll die Abschlagsänderung in Kraft treten (TT.MM.JJJJ)?\n\nBitte beachte, dass dein Abschlag immer zum 1️⃣. Werktag des Monats fällig ist.\n \n ",
              "buttons": null
            },
            {
              "text": "✅ Dein Abschlag wurde erfolgreich geändert 🤗\r \r Du bekommst von uns in Kürze per E-Mail eine Bestätigung mit deiner neuen Abschlagshöhe.\r \r ❗ Bitte beachte, dass dein Abschlag immer zum 1️⃣. Werktag des Monats fällig ist.",
              "buttons": null
            },
            {
              "text": "Oops, der Abschlag konnte leider nicht geändert werden 😕 Eine mögliche Ursache könnte ein zu hoher Wunschbetrag sein 😉  Bitte versuche es erneut und tippe hier \"Abschlag ändern\" ein :) ",
              "buttons": null
            },
            {
              "text": "z.B. ES1207445544",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Abschlagsprüfung",
          "intent": "ascertainPaymentAmount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich sehen ob mein Abschlag hoch genug ist?",
            "Decken meine Abschläge die anfallenden Energiekosten ab?",
            "Reicht mein Abschlag aus, um Nachzahlungen zu vermeiden?"
          ],
          "description": "Der Kunde möchte wissen, ob sein Abschlagsbetrag zum tatsächlichen Verbrauch passt.",
          "newIntent": true,
          "creationTimestamp": "2022-06-24T09:07:16.000Z"
        },
        {
          "name": "Abschlagszahlung aussetzen",
          "intent": "AP_deferPayment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist eine Ratenzahlung möglich?",
            "Rechnung in Raten zahlen.",
            "Wäre es möglich, wenn ich meine Abschlagszahlung nachträglich zahle?"
          ],
          "description": "Der Kunde möchte eine Abschlagszahlung aussetzen",
          "texts": [
            {
              "text": "Leider bieten wir aktuell keine Ratenzahlung auf Abschläge an. Wenn du Schwierigkeiten hast, deine Abschläge oder Jahres- bzw. Schlussabrechnungen zu zahlen, melde dich bitte bei uns. Wir stehen dir gern zur Seite und finden gemeinsam eine Lösung.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Aktuellen Abschlag und Fälligkeit anzeigen",
          "intent": "AP_currentAmountAndDueDate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Aktuellen Abschlag einsehen.",
            "Ich habe das Fälligkeitsdatum meines Abschlags vergessen.",
            "Ich möchte das Fälligkeitsdatum meines Abschlags wissen."
          ],
          "description": "Der Kunde möchte seinen aktuellen Abschlag und das Fälligkeitsdatum angezeigt bekommen",
          "texts": [
            {
              "text": "Bitte **Geburtsdatum** eingeben (Beispiel: 10.10.1910)",
              "buttons": null
            },
            {
              "text": "Der Abschlag wurde nicht gefunden 🙁.",
              "buttons": null
            },
            {
              "text": "Bitte **Vertragsnummer** eingeben (Testvertragsnr: 1 oder 2)",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Angebotene Zahlungsarten",
          "intent": "AP_offeredPaymentOptions",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich bezahlen?",
            "Welche Zahlungsmöglichkeiten gibt es?",
            "Was für Zahlungsarten bietet ihr an?"
          ],
          "description": "Der Kunde wünscht eine Auskunft über die verschiedenen Zahlungsarten.",
          "texts": [
            {
              "text": "Für deine regelmäßigen Abschlagszahlungen hast du zwei Zahlungsmöglichkeiten: **Überweisung** oder **SEPA Lastschrift (Dauerauftrag)**. Die Zahlungsart deiner Abschlagszahlung kannst du bequem und schnell online in unserem Kundenportal ändern.👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anpassungsgrenzen beim Abschlag",
          "intent": "AP_adjustmentLimit",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Abschlag mehrmals ändern?\r  ",
            "Um wie viel Prozent kann ich meinen Abschlag anpassen?",
            "Gibt es Grenzwerte bei der Abschlagsanpassung?"
          ],
          "description": "Der Kunde möchte die erlaubten Anpassungsgrenzen beim Abschlag erfahren.",
          "texts": [
            {
              "text": "Du hast die Möglichkeit, deinen Abschlag für den nächsten Monat um bis **zu 50% zu erhöhen ⬆** und **bis zu 20% zu senken ⬇**.\n\nDie Änderung deines Abschlags ist **frühestens 90 Tage nach Vertragsbeginn** möglich. Deinen Abschlag kannst schnell und unkompliziert hier im Chat ändern 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Abschlag ändern",
                  "value": "Abschlag ändern",
                  "answer_config": 69063,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Bankverbindung ändern",
          "intent": "AP_changeBankAccount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich meine Kontonummer wechseln?",
            "Mein Bankkonto hat sich geändert",
            "Ich will mein Konto ändern"
          ],
          "description": "Der Kunde möchte seine Zahlungsart oder Bankverbindung ändern.",
          "texts": [
            {
              "text": "Deine **Bankverbindung** kannst du ganz einfach in unserem Kundenportal ändern.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Gutschrift ändern",
          "intent": "AP_changeAmount",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Photovoltaik"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte die Höhe seiner EEG-Gutschrift ändern.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Erklärung zur Abschlagszahlung",
          "intent": "AP_whatIsAdvancePayment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was versteht man unter Abschlagszahlung?",
            "Warum gibt es Abschläge oder Teilzahlungen?",
            "Wie berechnet sich ein Abschlag? "
          ],
          "description": "Der Kunde möchte wissen, was eine Abschlagszahlung ist.",
          "texts": [
            {
              "text": "Ein Abschlag ist eine **Art Ratenzahlung für die Energie**, die du i.d.R. im gesamten Jahr verbrauchst. \n\nWir berechnen den Abschlag aus deinem **voraussichtlichen Jahresverbrauch** für Strom oder Erdgas sowie den **aktuell anfallenden Energiekosten**. Für die Schätzung deines voraussichtlichen Energieverbrauchs dient dein Vorjahresverbrauch als Maßstab 📏. Damit du in der Jahresabrechnung keine hohe Nachzahlung begleichen musst, teilen wir die voraussichtliche Rechnungssumme gleichmäßig auf 😊. \n\n💡 Das heißt: Bis zur nächsten Rechnung zahlst du **gleiche monatliche Abschläge** für deinen Jahresverbrauch.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Abschlag ändern",
                  "value": "Abschlag ändern",
                  "answer_config": 69063,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Zeigt sich bei der Jahresabrechnung, dass du **zu hohe Abschlagszahlungen** geleistet hast, zahlen wir dir dein Guthaben natürlich schnellstmöglich zurück. 💸",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Fälligkeitsdatum des Abschlag ändern",
          "intent": "AP_changeDueDate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Abschlagsfälligkeiten ändern.",
            "Wie kann ich das Fälligkeitsdatum ändern?",
            "Bitte das Datum der Abschläge ändern."
          ],
          "description": "Der Kunde wünscht eine Änderung des Fälligkeitsdatums der Abschlagszahlung.",
          "texts": [
            {
              "text": "Leider ist die **Änderung des Fälligkeitsdatums** deines Abschlags bei uns nicht möglich. 🙁 \n\n☝ Du hast aber die Möglichkeit, die **Höhe deiner Abschlagszahlung** im Rahmen bestimmter Grenzen anzupassen. Dies kannst du schnell und unkompliziert online in unserem Kundenportal tun.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Formular für Lastschriftmandate",
          "intent": "AP_SEPAmandate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo finde ich das Formular für SEPA Lastschriftverfahren?",
            "Ich benötige die Einzugsermächtigung.",
            "Wo finde ich das Lastschriftmandat?"
          ],
          "description": "Der Kunde möchte das SEPA- Lastschriftmandat erhalten.",
          "texts": [
            {
              "text": "Das Formular für deine Teilnahme am **SEPA Lastschriftverfahren** (z. B. für die Zahlung deiner Abschläge) kannst du ganz bequem hier herunterladen.\n\nÜbrigens: Sofern du einen erteilten Lastschriftauftrag zurückziehen und deine Zahlungsmethode ändern möchtest, findest du diese Option in unserem Kundenportal.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "SEPA Formular ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Grund für Abschlagserhöhung",
          "intent": "AP_reasonForPriceIncrease",
          "entity": {
            "entityName": "advancePayment",
            "normalizedEntityValue": "abschlag"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte den Grund für die Erhöhung des Abschlags wissen.",
          "newIntent": true,
          "creationTimestamp": "2023-10-06T10:58:28.000Z"
        },
        {
          "name": "Guthabenerstattung",
          "intent": "AP_refundCredit",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie werden Guthaben zurückbezahlt?",
            "Wird das Guthaben auf mein Konto überwiesen?",
            "Kann ich mein Guthaben bekommen?",
            "Wie erhalte ich mein Guthaben zurück? ",
            "Was kann ich mit dem Guthaben machen?",
            "Suche Formular zur Guthabenerstattung."
          ],
          "description": "Der Kunde hat Fragen zur Guthabenerstattung.",
          "texts": [
            {
              "text": "Falls du mit deinem über das Jahr verteilten Abschlagszahlungen **mehr bezahlt als tatsächlich verbraucht** hast, erhäst du den zuviel bezahlten Betrag als **Guthaben** auf dein Kundenkonto 💸.\n\nSolltest du weitere Fragen haben bin ich mir sicher, dass meine ##colleagueplural## aus dem Kundenservice beim Thema **Guthabenerstattung** weiterhelfen können 🙂\n",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kundenservice",
                  "value": "Kundenservice",
                  "answer_config": 69319,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kostenpauschalen",
          "intent": "lumpSum",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo finde ich eure Kostenpauschalen?",
            "Wie hoch sind die Pauschalen bei Zählerarbeiten?",
            "Ich suche eine Übersicht zu Kostenpauschalen."
          ],
          "description": "Der Kunde möchte mehr über aktuelle Kostenpauschalen erfahren.",
          "texts": [
            {
              "text": "Wende dich bitte an deinen Netzbetreiber falls du auf der Suche nach **Kostenpauschalen** für Baustrom, Zähler, Messungen oder Netzarbeiten bist.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-13T08:21:33.000Z"
        },
        {
          "name": "Mahnung",
          "intent": "AP_reminder",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Habe von euch eine Mahnung erhalten, was soll ich tun?",
            "Warum muss ich für die Mahnung zahlen?",
            "Wer trägt die Kosten für die Mahngebühren?"
          ],
          "description": "Der Kunde hat Rückfragen zu einer erhaltenen Mahnung.",
          "texts": [
            {
              "text": "Beim Thema \"Mahnung\" kann dir bestimmt unser Kundenservice helfen.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kundenservice",
                  "value": "Kundenservice",
                  "answer_config": 69319,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Offene Beträge/Rechnungen",
          "intent": "AP_debitorAccount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Muss ich nachzahlen?",
            "Muss ich eine Nachzahlung leisten?",
            "Möchte wissen, wieviel Euro ich noch zahlen muss."
          ],
          "description": "Der Kunde sucht Informationen zum Umgang mit offenen Beträgen und Rechnungen",
          "texts": [
            {
              "text": "Deine bereits **geleisteten und ausstehende Zahlungen**  kannst du online im Kundenportal einsehen. Dort erhäst du auch Informationen rund um deine **Rechnungen**.  \n\nSolltest du weitere Fragen zum Thema Zahlungen haben, wende dich bitte an den Kundenservice 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontaktdaten erhalten",
                  "value": "Kontaktdaten",
                  "answer_config": 69304,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Preiserhöhung",
          "intent": "AP_reasonForPriceIncrease",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Warum habe ich eine Abschlagserhöhung erhalten?"
          ],
          "description": "Der Kunde möchte den Grund für geplante oder geschehene Preiserhöhungen wissen.",
          "texts": [
            {
              "text": "Aufgrund der extrem in die Höhe gegangenen Großhandelspreise sind die Verbraucherpreise für Strom und Erdgas ebenfalls deutlich gestiegen. Die Preissteigerung kann durch ##utilityName## nicht mehr 1 zu 1 abgefangen werden, so dass wir gezwungen sind, einen Teil der gestiegenen Kosten an unsere Kund*innen weiterzugeben.\n\nDie Gründe für diese Preissteigerungen sind vielfältig, im Vordergrund steht aktuell der russische Angriffskrieg auf die Ukraine und die damit unsichere Lage der Erdgasversorgung in Deutschland.\n\nOb du von einer Preisanpassung betroffen bist und wie sich die Preisveränderung bei deinem Vertrag auswirkt wird dir rechtzeitig (mindestens mit einer Vorlaufzeit von 6 Wochen) per Brief 📩 mitgeteilt.\n\nSollte deine Frage nicht dabei sein, nimm bitte gerne Kontakt zu uns auf!",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Preiserhöhung Gas",
          "intent": "AP_reasonForPriceIncrease",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Gas"
          },
          "utterances": [
            "Wieso steigen die Preise für Gas?"
          ],
          "description": "Der Kunde möchte den Grund für geplante oder geschehene Erhöhungen des Gaspreises wissen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Preiserhöhung Strom",
          "intent": "AP_reasonForPriceIncrease",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Strom"
          },
          "utterances": [
            "Der Preis für den Stromtarif ist angestiegen, wieso?"
          ],
          "description": "Der Kunde möchte den Grund für geplante oder geschehene Erhöhungen des Strompreises wissen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zur Abschlagszahlung",
          "intent": "advancePaymentOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Abschlag",
            "Ich habe Fragen zum Abschlag",
            "Hilfe beim Abschlag"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Abschlag und Zahlungen.",
          "texts": [
            {
              "text": "Du hast eine Frage zum Thema **Abschlagszahlung**?\n\nWähle einfach eine der Optionen aus oder gib unten eine andere Frage ein. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Abschlag ändern",
                  "value": "Abschlag ändern",
                  "answer_config": 69063,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Abschlagsfälligkeit ändern",
                  "value": "Abschlagsfälligkeit ändern",
                  "answer_config": 69067,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Aktuellen Abschlag einsehen",
                  "value": "Aktuellen Abschlag einsehen",
                  "answer_config": 69069,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Bankverbindung ändern",
                  "value": "Bankverbindung ändern",
                  "answer_config": 69065,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Wie errechnet sich mein Abschlag?",
                  "value": "Was versteht man unter Abschlagszahlung?",
                  "answer_config": 69080,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-06-09T14:30:05.000Z"
        },
        {
          "name": "Zahlplan",
          "intent": "AP_payPlan",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie viele Abschläge muss ich bezahlen?",
            "Wie viele Abschläge habe ich jeden Monat zu bezahlen?",
            "Wie viele Abschläge gibt es pro Jahr?"
          ],
          "description": "Der Kunde möchte Informationen zur Möglichkeit eines Zahlplans.",
          "texts": [
            {
              "text": "Deinen **aktuellen Abschlagsplan** findest du auf deiner letzten Jahresrechnung 😊. Falls Du **Neukunde** bist, dann findest deinen Abschlagsplan auf der **Vertragsbestätigung**. \n\n💡 Alternativ kannst du die wichtigsten Informationen rund um deinen Vertrag im Kundenportal einsehen 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Abschlagsplan anpassen",
                  "value": "Abschlag ändern",
                  "answer_config": 69063,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Kontakt und Service",
      "Intents": [
        {
          "name": "Adresse Kundenzentrum",
          "intent": "SM_address",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo ist euer Sitz?",
            "Wie lautet die Adresse?",
            "Wie finde ich euch?"
          ],
          "description": "Der Kunde möchte Informationen zur Adresse des Kundenzentrums",
          "texts": [
            {
              "text": "**Unser Sitz** 🏠? Hier bitte:\n\n##utilityName##\\\n##adressStreet## ##adressStreetNr##\\\n##adressZIP## ##adressCity##",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Allgemeine Beschwerde",
          "intent": "SM_complaint",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich mich beschweren?",
            "Wo kann ich meine Beschwerden melden?",
            "Bei euch ist immer belegt. "
          ],
          "description": "Der Kunde hat eine allgemeine Beschwerde",
          "texts": [
            {
              "text": "Du hast eine Beschwerde? Nimm doch gerne Kontakt zu meinen ##colleagueplural## vom Kundenservice auf. Sie kümmern sich gerne um dein Anliegen.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anfragen auf Englisch",
          "intent": "SM_englishRequest",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Can you help me with the meter readings?",
            "Can someone help me?",
            "Advance Payment, how does it work?"
          ],
          "description": "Der Kunde macht eine englische Eingabe und erhält die Kontaktdaten auf Englisch",
          "texts": [
            {
              "text": "If you have any questions or concerns and don't speak German, please don't hesitate to call or email us in English.   ‌\n\n📞 **##customerServiceNr##**   \n‌📩 **##emailAdress##**",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Beschwerde zum Thema Zahlungen",
          "intent": "AP_complaint",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Abschlag falsch bezahlt",
            "Abschlag falsch überwiesen",
            "Abschlag nicht richtig berechnet"
          ],
          "description": "Der Kunde hat eine Beschwerde zum Thema Abschlag und Zahlungen.",
          "texts": [
            {
              "text": "Du hast eine **Beschwerde**? Nimm doch gerne Kontakt zu meinen ##colleagueplural## vom Kundenservice auf. Sie kümmern sich gern um dein Anliegen 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Kontaktdaten",
                  "value": "Kontaktdaten",
                  "answer_config": 69304,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Live-Chat (MO-FR: 08:00-16:00)",
                  "value": "Live-Chat",
                  "answer_config": 69145,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "E-Mail Empfangsprobleme",
          "intent": "missingEmail",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde moniert eine noch ausstehende Zustellung einer E-Mail.",
          "texts": [
            {
              "text": "Sofern du eine **erwartete E-Mail nicht finden** kannst, kontrolliere bitte zunächst die korrekte Schreibweise deiner E-Mail-Adresse. Prüfe zudem deinen Spam-Ordner und stelle sicher, dass in deinem Postfach noch Speicherplatz zur Verfügung steht.\n\nIn bestimmten Fällen geht einer E-Mail eine **manuelle Bearbeitung** voraus, sodass der **E-Mail-Versand nicht unmittelbar** erfolgt. Wir bitten dich hier um ein wenig Geduld.\n\nSofern es auch auf Dauer zu Problemen mit dem Empfang einer E-Mail kommt, wende dich bitte an unseren Kundenservice.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-09-09T08:56:32.000Z"
        },
        {
          "name": "Fördermittelberatung",
          "intent": "SA_fundingConsulting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo ist die Fördermittelberatung",
            "Informationen zu Förderprogrammen."
          ],
          "description": "Der Kunde sucht Beratung zu Fördermitteln.",
          "texts": [
            {
              "text": "Zum Themengebiet Fördermittelberatung habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Forderungsmanagement",
          "intent": "SM_receivableManagement",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo ist die Kasse der Stadtwerke?",
            "Wie lauten die Kontaktdaten des Forderungsmanagements?",
            "Ich brauche die Telefonnummer des Forderungsmanagements. "
          ],
          "description": "Der Kunde möchte Kontaktdaten des Forderungsmanagements",
          "texts": [
            {
              "text": "Die Kontaktdaten unseres Forderungsmanagements findest du unter folgendem Link:",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Handover",
          "intent": "handover",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Es wird angeboten, via Livechat mit einem Mitarbeiter zu sprechen",
          "texts": [
            {
              "text": "*Tut mir leid, derzeit ist keiner/keine unserer BeraterInnen verfügbar. \\\nUnsere **Live-Chat-Servicezeiten** sind \\\nMontag - Freitag: ____* \n\n💡 Dies ist nur eine Demo-Vorführung. Hier können wir auch externe Live-Chat Lösungen einbinden 😊",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kontaktanfrage stellen",
          "intent": "SM_contactRequest",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ruft mich an.",
            "Wie stelle ich einen Rückrufwunsch ein?",
            "Bitte meldet euch bei mir unter der folgenden Nummer:"
          ],
          "description": "Der Kunde hat eine Kontaktanfrage/Rückrufwunsch",
          "texts": [
            {
              "text": "Vor- und Nachname",
              "buttons": null
            },
            {
              "text": "Anliegen ***(optional)***",
              "buttons": null
            },
            {
              "text": "Wie können wir dich kontaktieren?",
              "buttons": null
            },
            {
              "text": "z.B. ES1207445544",
              "buttons": null
            },
            {
              "text": "Bitte wähle eine Kategorie aus ***(optional)*** 👇",
              "buttons": null
            },
            {
              "text": "Vielen Dank. Meine ##colleagueplural## melden sich schnellstmöglich bei dir.",
              "buttons": null
            },
            {
              "text": "Du kannst dich jederzeit bei uns melden.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kontaktdaten anzeigen",
          "intent": "SM_contact",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wann kann man bei euch anrufen?",
            "Was ist ihre E-Mail-Adresse?",
            "Was ist eure Telefonnummer?"
          ],
          "description": "Der Kunde möchte die Kontaktdaten angezeigt bekommen",
          "texts": [
            {
              "text": "**KONTAKTDATEN:**\\\n📩 **##emailAdress##**\\\n📞 **##customerServiceNr##**\n\n**GESCHÄFTSZEITEN:**\\\n**Mo-Do**: 08:00-12:00 Uhr & 13:00-16:45 Uhr\\\n**Fr**: 08:00-12:30 Uhr  \noder mit Termin nach telefonischer Vereinbarung ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kundenservice",
          "intent": "SM_customerService",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche die Kundencenterhotline.",
            "Ich möchte mit dem Kundenservice sprechen.",
            "Wie erreiche ich den Kundenservice?"
          ],
          "description": "Der Kunde möchte Information zu Adresse und Öffnungszeiten des Kundenservices",
          "texts": [
            {
              "text": "Ich bin mir sicher, dass dir meine ##colleagueplural## vom Kundenservice bei dieser Frage weiterhelfen können. So erreichst du uns am besten: ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Öffnungszeiten Kundenzentrum",
          "intent": "SM_openingHoursCustomerCenter",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wann hat Ihr Kundencenter geöffnet?",
            "Wie lang sind eure Geschäftszeiten?",
            "Wie lauten eure Öffnungszeiten?"
          ],
          "description": "Der Kunde möchte die Öffnungszeiten des Kundenzentrums erfahren",
          "texts": [
            {
              "text": "**UNSERE ÖFFNUNGSZEITEN**:\\\n\\\n **Montag, Dienstag, Donnerstag:**\\\n08:00 - 11:45 Uhr und 13:30 -15.00 Uhr\\\n**Mittwoch:**\\\n08:00 - 11.45 Uhr und 13.30 - 17.00 Uhr\\\n**Freitag:**\\\n08:00 - 12.15 Uhr\n\n📞 **0123-4567**",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Störung melden",
          "intent": "blackout",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche die Notfallnummer.",
            "Ich habe einen Notfall.",
            "Ich benötige die Störungshotline."
          ],
          "description": "Der Kunde möchte eine Störung melden, die sich auf unterschiedliche Sparten beziehen könnte.",
          "texts": [
            {
              "text": "Du hast einen **Notfall** 🚨?\n\n  \nUnser Bereitschaftsdienst ist **rund um die Uhr** telefonisch erreichbar.\n\nUm was für eine Störung handelt es sich?",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Fernwärme",
                  "value": "Störung Wärme",
                  "answer_config": 69094,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Gas",
                  "value": "Probleme mit der Gasversorgung",
                  "answer_config": 69090,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Strom",
                  "value": "Stromausfall",
                  "answer_config": 69093,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Wasser",
                  "value": "Störung Wasserversorgung",
                  "answer_config": 69095,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Gas",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Gas"
          },
          "utterances": [
            "Wie nehme ich Gasgeruch wahr?",
            "Was soll ich tun wenn es nach Gas riecht?",
            "Verdacht auf Gasgeruch, was soll man tun?"
          ],
          "description": "Der Kunde möchte eine Störung in der Gasversorgung melden.",
          "texts": [
            {
              "text": "Du hast Gasgeruch wahrgenommen? Gasgeruch ist kein Grund zur Panik, bleibe bitte ruhig und beachte die folgenden Punkte: \\\n**Geruch des Gases:**\nErdgas ist von Natur aus geruchlos! Dem Erdgas wird jedoch ein Geruchsstoff zugesetzt, damit auch kleinste Gasmengen sofort bemerkt werden 🙂\n\n\n\n**Faustregel bei Gasgeruch:** ☝☝☝\n- Verlasse das Gebäude unverzüglich!\n- Licht- und Geräteschalter nicht mehr betätigen, keine Stecker aus der Steckdose ziehen!\n- Fenster und Türen auf!\n- Wähle folgende **Notrufnummer** von außerhalb des Hauses:\\\n📞 **0123/4567**\n\nUnsere Mitarbeiter kommen zu dir und suchen vor Ort die Ursache des Gasgeruchs.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Internet",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Internet"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Internetstörung melden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Straßenlaterne",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Straßenlaterne"
          },
          "utterances": [
            "Das Licht in meiner Straße geht nicht mehr.",
            "Die Laternen in der Hauptstraße sind alle kaputt.",
            "Wo kann ich eine defekte Straßenlaterne melden?"
          ],
          "description": "Der Kunde möchte eine Störung melden, die sich auf die Straßenbeleuchtung bezieht.",
          "texts": [
            {
              "text": "Vielen Dank, ich leite deine Meldung sofort weiter 😊!",
              "buttons": null
            },
            {
              "text": "Du möchtest uns eine defekte Straßenlaterne melden? Bitte fülle dafür das folgende Formular aus 👇",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Strom",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Strom"
          },
          "utterances": [
            "Ich habe eine Stromstörung.",
            "Strom geht nicht mehr.",
            "Strom ist ausgefallen."
          ],
          "description": "Der Kunde möchte eine Störung in der Stromversorgung melden.",
          "texts": [
            {
              "text": "Bei einer **Störung im Strom- oder Gasnetz** ⚡ wende dich bitte an den zuständigen Netzbetreiber.\n\nDeinen Netzbetreiber findest du auf deiner Rechnung 📄.",
              "buttons": null
            },
            {
              "text": "Bei einer **Störung im Strom- oder Gasnetz** ⚡ wende dich bitte an den zuständigen Netzbetreiber.\n\nDeinen Netzbetreiber findest du auf deiner Rechnung 📄.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden TV",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "TV"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Fernsehstörung melden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Wärme",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Wärme"
          },
          "utterances": [
            "Meine Heizung ist ausgefallen.",
            "Meine Fernwärme funktioniert nicht mehr.",
            "Mein Heizkörper wird nicht mehr warm."
          ],
          "description": "Der Kunde möchte eine Störung in der Wärmeversorgung melden.",
          "texts": [
            {
              "text": "Du hast einen **Notfall mit der Fernwärmeversorgung** 🚨 und \nbenötigst die Notfallrufnummer?\n\nBitte melde dich telefonisch im Kundencenter:\\\n\\\n📞 **##customerServiceNr##**",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Störung melden Wasser",
          "intent": "blackout",
          "entity": {
            "entityName": "blackoutType_L",
            "normalizedEntityValue": "Wasser"
          },
          "utterances": [
            "Ich bekomme kein Frischwasser mehr.",
            "Ich habe ein Wasserleck.",
            "Ich habe eine Überschwemmung wegen Rohrbruch."
          ],
          "description": "Der Kunde möchte eine Störung in der Wasserversorgung melden.",
          "texts": [
            {
              "text": "Du hast eine **Störung in der Wasserversorgung**? \n\nBitte melde dich telefonisch im Kundencenter:\n\n📞 ##customerServiceNr##",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-29T16:32:44.000Z"
        },
        {
          "name": "Technische Störung",
          "intent": "SM_technicalMalfunction",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Es gibt ein Problem mit dem Tarifrechner.",
            "Es gibt ein Problem mit dem Tarifrechner"
          ],
          "description": "Der Kunde hat eine technische Störung auf der Homepage entdeckt",
          "texts": [
            {
              "text": "Vielen Dank für deinen Eintrag! Deine Daten wurden erfolgreich erfasst und meine ##colleagueplural## kümmern sich schnellstmöglichst um die technische Störung! ",
              "buttons": null
            },
            {
              "text": "Du hast eine technische Störung auf unserer Homepage entdeckt? Das tut mir leid 😟 Bitte überprüfe ggf. deine Daten und versuchen es zu einem späteren Zeitpunkt noch einmal. \n\nFalls es sich um ein **dringendes Anliegen** handelt, dann wende dich bitte an den Kundenservice 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontaktdaten anzeigen",
                  "value": "Kontaktdaten",
                  "answer_config": 69304,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Terminverwaltung",
          "intent": "makeOrManageAppointment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte einen persönlichen Termin vereinbaren oder verwalten (verschieben/stornieren).",
          "newIntent": true,
          "creationTimestamp": "2022-07-25T13:58:53.000Z"
        },
        {
          "name": "Veröffentlichungspflichten Netzbetreiber",
          "intent": "disclosureRequirementsGridOperator",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte veröffentlichungspflichtige Dokumente (z. B. zur MaKo) des Netzbetreibers einsehen.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-11T08:18:49.000Z"
        }
      ]
    },
    {
      "SkillName": "Rechnung",
      "Intents": [
        {
          "name": "Abrechnungszeitraum",
          "intent": "ID_billingCycle",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was bedeutet Abrechnungszeitraum?",
            "Wer bestimmt den Abrechnungszeitraum?",
            "Wie lang ist ein Abrechnungszeitraum?"
          ],
          "description": "Der Kunde möchte wissen, was der Abrechnungszeitraum bedeutet",
          "texts": [
            {
              "text": "Der **Abrechnungsturnus** legt fest in welchen Intervallen du eine Energierechnung erhältst. I.d.R. wird **jährlich eine Rechnung** erstellt, auf Wunsch kann auch monatlich oder quartalsweise eine Rechnung erstellt werden.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Brutto-/Nettobetrag",
          "intent": "ID_grossPriceAndNetPrice",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist der Nettopreis?",
            "Was ist der Unterschied zwischen dem Netto- und Bruttobetrag?",
            "Was ist die Mehrwertsteuer?"
          ],
          "description": "Der Kunde möchte den Unterschied zwischen Brutto-/Nettobetrag erklärt haben",
          "texts": [
            {
              "text": "Der **Nettopreis** bezeichnet die Energiekosten im angegebenen Abrechnungszeitraum ohne Umsatzsteuer. Der **Bruttopreis** beinhaltet somit den Nettobetrag zzgl. der Umsatzsteuer.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Mehrwertsteuersenkung",
          "intent": "vatReduction",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zur Mehrwertsteuersenkung",
          "texts": [
            {
              "text": "## Die Mehrwertsteuer auf Gas wird gesenkt!\n\nAngesichts der hohen Gaspreise **entlastet** die Bundesregierung die Menschen in Deutschland bei der **Mehrwertsteuer**. \n\nKünftig soll die **Steuer auf Gasverbrauch 7 statt wie bisher 19 Prozent betragen**, kündigte Kanzler Scholz in Berlin an. Dies solle bis März 2024 gelten.\n\nWeitere Informationen findest du unter dem folgenden Link:",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Infos der Bundesregierung ↗",
                  "value": "https://www.bundesregierung.de/breg-de/suche/gasumlage-mehrwertsteuer-2075248",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-10-11T14:52:51.000Z"
        },
        {
          "name": "Rechnungen einsehen",
          "intent": "billOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich meine Abrechnung online abrufen?"
          ],
          "description": "Der Kunde fragt, wo die Rechnungen einzusehen sind.",
          "texts": [
            {
              "text": "Informationen diesbezüglich finden Sie in Ihrem Kundenportal 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rechnungsbetrag",
          "intent": "ID_invoiceAmount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erkläre mir, wie der Rechnungsbetrag zustande kommt.",
            "Ich verstehe meinen Rechnungsbetrag nicht.",
            "Wie wird der Rechnungsbetrag berechnet?"
          ],
          "description": "Der Kunde möchte eine Auskunft zum Rechnungsbetrag",
          "texts": [
            {
              "text": "Der **Rechnungsbetrag** ergibt sich aus deinem Gesamtverbrauch im Abrechnungszeitraum abzüglich der geleisteten Abschlagszahlungen.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rechnungserklärung",
          "intent": "invoiceExplanation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich verstehe die Rechnung nicht.",
            "Kannst du mir bitte meine Rechnung erklären?",
            "Rechnungserklärung"
          ],
          "description": "Der Kunde wünscht eine Erklärung zu den verschiedenen Posten auf der Rechnung.",
          "texts": [
            {
              "text": "Ich kann dir auch gerne Fragen zu deiner **Strom- oder Gasrechnung** beantworten 🙂 \n\nProbiere es doch aus und frage mich etwas zu Begriffen auf deiner **Stromrechnung**! \n\nKlicke auf eine der unteren Beispielfragen zum Thema Rechnung oder stelle mir eine andere!\n",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Was ist der Arbeitspreis?",
                  "value": "Was ist der Arbeitspreis?",
                  "answer_config": 69162,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Was ist der Strommix?",
                  "value": "Was ist der Strommix?",
                  "answer_config": 69160,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Was ist die CO2-Steuer?",
                  "value": "Was ist die CO2-Steuer?",
                  "answer_config": 69152,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Was ist die Stromsteuer?",
                  "value": "Was ist die Stromsteuer?",
                  "answer_config": 69161,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Wer legt die Abgaben fest?",
                  "value": "Wer legt die Abgaben fest?",
                  "answer_config": 69176,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-23T14:25:43.000Z"
        },
        {
          "name": "Rechnungszeitpunkt",
          "intent": "billTime",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Die Rechnung ist nicht gekommen.",
            "Bis wann kann ich mit meiner Rechnung rechnen?",
            "Ich habe meine Stromrechnung nicht bekommen."
          ],
          "description": "Der Kunde möchte wissen, wann er seine Rechnung erhält.",
          "texts": [
            {
              "text": "Wie lautet deine **Vertragsnummer** (Beispielvertragsnr: 1 oder 2)",
              "buttons": null
            },
            {
              "text": "Deine aktuelle Rechnungsperiode begann am ${invoicePeriodStartDate} und endet am ${invoicePeriodEndDate}.\n\n**Deine Rechnung erhältst du spätestens sechs Wochen nach Ende deiner Rechnungsperiode.**",
              "buttons": null
            },
            {
              "text": "Deine **Jahresrechnung** erhältst du jährlich zu einem vom Lieferanten festgelegten Termin. Das ist nicht zwangsläufig immer zum Jahresende. Doch es sollte **für deinen Haushalt** jedes Jahr in etwa der **gleiche Zeitpunkt** sein.\r \rIn der Regel erhältst du deine Rechnung **innerhalb von sechs Wochen nach Ablauf der Rechnungsperiode**. Deine Rechnungsperiode kannst du unter Angabe von **Vertragsnummer** und **Geburtsdatum** im nächsten Schritt bestimmen! 🙂",
              "buttons": null
            },
            {
              "text": "Wie lautet dein **Geburtsdatum** (Für Testzwecke verwende bitte den 10.10.1910 als Geburtsdatum 😉)?",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rechnungszeitpunkt Endabrechnung",
          "intent": "billTime",
          "entity": {
            "entityName": "invoiceType_L",
            "normalizedEntityValue": "Endabrechnung"
          },
          "utterances": [
            "Wann erhalte ich meine Endabrechnung für Strom, nachdem ich gekündigt habe?"
          ],
          "description": "Der Kunde möchte wissen, wann er seine Endabrechnung erhält.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rechnungszeitpunkt Hausanschluss",
          "intent": "billOverview",
          "entity": {
            "entityName": "energyTypeBilling_Reg",
            "normalizedEntityValue": "energyTypeBilling_Reg"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde fragt, wann er die Rechnung für den Hausanschluss erhält.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rechnungszeitpunkt Jahresabrechnung",
          "intent": "billTime",
          "entity": {
            "entityName": "invoiceType_L",
            "normalizedEntityValue": "Jahresabrechnung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, wann er seine Jahresrechnung erhält.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Restbetrag",
          "intent": "ID_amountPayable",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist der zu zahlende Restbetrag?",
            "Warum muss ich einen Restbetrag bezahlen?",
            "Wie berechnet man den Restbetrag?"
          ],
          "description": "Der Kunde möchte wissen, was der Restbetrag bedeutet",
          "texts": [
            {
              "text": "Der **zu zahlende Betrag** entspricht dem Rechnungsbetrag abzüglich der geleisteten Abschlagszahlungen.\\\n\\\nAuf Basis deines **Energieverbrauchs** ⚡ und deiner **Zahlungen** 💰 für dein letztes Verbrauchsjahr ergibt sich ein **Restbetrag** (Nachzahlung) oder ein **Guthaben**.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Simulationsrechnung",
          "intent": "billOverview",
          "entity": {
            "entityName": "invoiceType_L",
            "normalizedEntityValue": "Simulationsrechnung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde fragt nach einer Rechnungssimulation.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zu Rechnungsfragen",
          "intent": "ID_generalInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe eine Frage zu meiner Rechnung.",
            "Rechnung",
            "Ich benötige Informationen zu meiner Rechnung."
          ],
          "description": "Der Kunde stellt eine nicht näher konkretisierte Frage zum Thema Rechnung.",
          "texts": [
            {
              "text": "Gerne helfe ich dir zum Thema **Rechnung** weiter.  😊 \n\nWorum geht es genau? Zutreffendes bitte auswählen 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Beschwerde zur Rechnung",
                  "value": "Beschwerde zur Rechnung",
                  "answer_config": 69068,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Rechnungserklärung",
                  "value": "Rechnungserklärung",
                  "answer_config": 69185,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Rechnungskopie",
                  "value": "Wie erhalte ich eine Rechnungskopie?",
                  "answer_config": 69086,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Wann kommt die Rechnung?",
                  "value": "Wann kommt meine Rechnung?",
                  "answer_config": 69087,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Verbrauchsstelle",
          "intent": "ID_consumptionPoint",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was sagt die Zählpunktbezeichnung aus?",
            "Was ist die Bedeutung der Zählpunktbezeichnung?",
            "Was ist der Zählpunkt?"
          ],
          "description": "Der Kunde möchte eine Auskunft über die Verbrauchstelle",
          "texts": [
            {
              "text": "Als **Verbrauchsstelle**/**Lieferstelle** bezeichnet man den **Ort (Adresse)**, an dem sich der **Zähler befindet** und du deinen Strom bzw. dein Gas/Wasser verbrauchst. Dies sind in der Regel deine **Wohnung oder dein Haus** 🏠 (ggf. auch dein Garten, der Keller sowie die Garage).\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Verbrauchsübersicht",
          "intent": "ID_consumptionOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Übersicht meiner Verbräuche erklären.",
            "Was bedeutet die Verbrauchsübersicht?",
            "Was bringt mir die Verbrauchsübersicht?"
          ],
          "description": "Der Kunde möchte eine Erklärung zur Verbrauchsübersicht",
          "texts": [
            {
              "text": "In der **Verbrauchsübersicht** kannst du deinen **Stromverbrauch** der letzten beiden Abrechnungszeiträume vergleichen. An dieser Stelle kannst du sehen, ob dein Stromverbrauch **gestiegen oder gesunken** ist 😉.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Energiewirtschaft FAQ",
      "Intents": [
        {
          "name": "§19 StromNEV",
          "intent": "ID_nevApportionment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wozu ist die § 19 Zulage?",
            "Welche Relevanz hat §19 der Stromnetzentgeltverordnung?",
            "Was ist die StromNev?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur Stromnetzentgeltverordnung.",
          "texts": [
            {
              "text": "Nach **§ 19 Stromnetzentgeltverordnung (StromNEV)** haben bestimmte Letztverbraucher die Möglichkeit, vom örtlichen Netzbetreiber niedrigere individuelle Netzentgelte zu erhalten.\\\n\\\nDie **Übertragungsnetzbetreiber (ÜNB)** müssen den örtlichen Netzbetreibern die durch diese niedrigeren Entgelte entgangenen Erlöse erstatten. Die ÜNB gleichen die Zahlungen für diese entgangenen Erlöse untereinander aus und **errechnen einen Aufschlag** auf die Netzentgelte, der als **Umlage auf alle Letztverbraucher** umgelegt wird. Die Umlage beträgt ##nev## cent/kWh.\\\n\\\nWeitere Informationen findest du unter 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Netztransparenz.de ↗",
                  "value": "https://www.netztransparenz.de/EnWG/Abschaltbare-Lasten-Umlage/Abschaltbare-Lasten-Umlagen-Uebersicht",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Abwasser",
          "intent": "SM_rainwater",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "An wen wende ich mich wegen den Abwassergebühren?"
          ],
          "description": "Der Kunde möchte Informationen zu Abwasser und Abwassergebühren im Allgemeinen.",
          "texts": [
            {
              "text": "Zum Themengebiet **Niederschlagwasser** habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Arbeitspreis",
          "intent": "ID_energyRate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Welche Bedeutung hat der Arbeitspreis?",
            "Wo finde ich Informationen zum Arbeitspreis?",
            "Was ist ein Arbeitspreis?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zum Arbeitspreis",
          "texts": [
            {
              "text": "Der **Arbeitspreis** ist der Preis, der für das tatsächlich verbrauchte Gas oder den tatsächlich verbrauchten Strom in Cent pro Kilowattstunde bezahlt wird.  ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Auszahlung der Preisbremsen",
          "intent": "priceControlDisbursement",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Muss ich wegen der Preisbremse meinen Abschlag anpassen?",
            "Wie erhalte ich das Geld, das ich durch die Preisbremse einspare?",
            "Wie wird die Preisbremse auf meiner Jahresrechnung dargestellt?"
          ],
          "description": "Der Kunde möchte wissen wie die Entlastungsbeträge in seinem Abschlag und/oder seiner Rechnung berücksichtigt werden.",
          "texts": [
            {
              "text": "Die aus den Preisbremsen hervorgehenden Entlastungen werden sich in deinen Abschlägen wiederspiegeln. \nDie Entlastungsbeträge aus **Januar und Februar** werden vorraussichtlich mit der **Abschlagszahlung im März verrechnet**. Hierbei verringert sich der Abschlag für März maximal auf einen Betrag von 0. \n\nDarüberhinausgehende Restbeträge werden in deiner nächsten regulären Rechnung berücksichtig.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-02-27T12:17:12.000Z"
        },
        {
          "name": "Berechnung der Gaspreisbremse",
          "intent": "reliefCalculation",
          "entity": {
            "entityName": "priceControls",
            "normalizedEntityValue": "Gaspreisbremse"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen auf welcher Berechnungsgrundlage die Gaspreisbremse kalkuliert wird und die eigene Entlastung berechnen lassen.",
          "newIntent": true,
          "creationTimestamp": "2023-03-28T09:29:14.000Z"
        },
        {
          "name": "Berechnung der Preisbremsen",
          "intent": "reliefCalculation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie hoch ist die Entlastung bei einem Jahresverbrauch von 2500 kWh?",
            "Wie erfolgt die Berechnung der Gaspreisbremse?",
            "Meine Entlastung berechnen."
          ],
          "description": "Der Kunde möchte wissen auf welcher Berechnungsgrundlage die Preisbremsen kalkuliert werden.",
          "texts": [
            {
              "text": "Du möchtest wissen wie sich dein Entlastungsbetrag zusammensetzt?\r \r Um dich hier richtig beraten zu können, musst du zunächst auswählen für welche Sparte du eine Erklärung hinsichtlich des Entlastungbetrages haben möchtest.",
              "buttons": null
            },
            {
              "text": "Strom",
              "buttons": null
            },
            {
              "text": "Gas",
              "buttons": null
            },
            {
              "text": "Bei einem Verbrauch kleiner 30.000 kWh wird der monatliche Entlastungsbetrag der **Strompreisbremse** wie folgt berechnet:\n\n**1/12 \\* aktuelle Prognose  \\* 80% \\* (Gültiger Arbeitspreis - 40 ct/kWh)**",
              "buttons": null
            },
            {
              "text": "Bei einem Verbrauch kleiner 1.500.000 kWh wird der monatliche Entlastungsbetrag der **Gaspreisbremse** wie folgt berechnet:\r \r **1/12 \\* Prognose Stand September 2022 \\* 80% \\* (Gültiger Arbeitspreis - 12 ct/kWh)**",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-02-27T12:18:50.000Z"
        },
        {
          "name": "Berechnung der Strompreisbremse",
          "intent": "reliefCalculation",
          "entity": {
            "entityName": "priceControls",
            "normalizedEntityValue": "Strompreisbremse"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen auf welcher Berechnungsgrundlage die Strompreisbremse kalkuliert wird  und die eigene Entlastung berechnen lassen.",
          "newIntent": true,
          "creationTimestamp": "2023-03-28T09:29:14.000Z"
        },
        {
          "name": "CO2-Steuer",
          "intent": "ID_carbonTax",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Informationen zur CO2-Steuer.",
            "Wie bezahle ich die CO2-Steuer?",
            "Was ist die CO2-Steuer?"
          ],
          "description": "Der Kunde stellt Rückfragen zur CO2-Steuer",
          "texts": [
            {
              "text": "Weitere Informationen zum Thema **CO2-Steuer** findest du unter folgendem Link 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "C02-Steuer ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Durchschnittlicher Energieverbrauch",
          "intent": "averageConsumption",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde kennt seine Energieverbrauchswerte (Strom, Gas, etc.) nicht und sucht Informationen zu durchschnittlichen Orientierungswerten.",
          "texts": [
            {
              "text": "Mithilfe **durchschnittlicher Verbrauchswerte** kannst du auch deinen Verbrauch besser einschätzen, sofern du dir darüber unsicher bist. Um welche Energiesparte geht es genau?",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Gas",
                  "value": "Wie ist der durchschnittliche Gasverbrauch?",
                  "answer_config": 69084,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Strom",
                  "value": "Wie ist der durchschnittliche Stromverbrauch?",
                  "answer_config": 69085,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-05-18T09:12:16.000Z"
        },
        {
          "name": "Durchschnittlicher Gasverbrauch",
          "intent": "averageConsumption",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Gas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde kennt seine Verbrauchswerte für Gas nicht und sucht Informationen zu durchschnittlichen Orientierungswerten.",
          "texts": [
            {
              "text": "Wenn du deinen **Gasverbrauch** noch nicht einschätzen kannst, empfehlen wir dir, dich zunächst an den **Durchschnittswerten** zu orientieren.\nHaushaltsgröße\t (Ø-Verbrauch)\n- 1 Person\t         (7000 kWh)\t\n- 2 Personen\t (14650 kWh)\t \n- 3 Personen\t (22500 kWh)\n- 4 Personen\t (30000 kWh)\t ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-05-18T09:12:16.000Z"
        },
        {
          "name": "Durchschnittlicher Stromverbrauch ",
          "intent": "averageConsumption",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Strom"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde kennt seine Verbrauchswerte für Strom nicht und sucht Informationen zu durchschnittlichen Orientierungswerten.",
          "texts": [
            {
              "text": "Wenn du deinen **Stromverbrauch** noch nicht einschätzen kannst, empfehlen wir dir, dich zunächst an den Durchschnittswerten zu orientieren.\nHaushaltsgröße\t (Ø-Verbrauch)\n- 1 Person\t         (1750 kWh)\t\n- 2 Personen\t (3500 kWh)\t \n- 3 Personen\t (4200 kWh)\n- 4 Personen\t (4800 kWh)\t ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-05-18T09:12:16.000Z"
        },
        {
          "name": "Durchschnittlicher Wärmeverbrauch",
          "intent": "averageConsumption",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Wärme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde kennt seine Verbrauchswerte für Wärme nicht und sucht Informationen zu durchschnittlichen Orientierungswerten.",
          "newIntent": false,
          "creationTimestamp": "2022-05-18T09:12:16.000Z"
        },
        {
          "name": "Durchschnittlicher Wasserverbrauch",
          "intent": "averageConsumption",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Wasser"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde kennt seine Verbrauchswerte für Wasser nicht und sucht Informationen zu durchschnittlichen Orientierungswerten.",
          "newIntent": false,
          "creationTimestamp": "2022-05-18T09:12:16.000Z"
        },
        {
          "name": "EEG-Umlage",
          "intent": "ID_eegApportionment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Warum muss ich die EEG-Umlage bezahlen?",
            "Was ist die EEG-Umlage?",
            "Was versteht man unter EEG?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur EEG-Umlage.",
          "texts": [
            {
              "text": "Bei der **EEG-Umlage** handelt es sich um eine Abgabe zur Finanzierung des **Ausbaus erneuerbarer Energien**.\n\nDie Umlage wurde **zum 01.01.2023 gesetzlich abgeschafft**, um den Verbraucher angesichts steigender Energiepreise zu entlasten. Die finanzielle Förderung erneuerbarer Energien wird seither **vom Bundeshaushalt getragen**.\n\n💡 Gut zu wissen: Der Wegfall der EEG-Umlage wird **automatisch bei jedem Kunden berücksichtigt** und auf der nächsten Rechnung entsprechend ausgewiesen.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Weitere Informationen ↗",
                  "value": "https://www.netztransparenz.de/EEG/EEG-Umlagen-Uebersicht",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Energieeinsparverordnung",
          "intent": "energySavingOrdinance",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erklärung zu EnEV",
            "Was bedeutet EnEV?",
            "Was ist die Energieeinsparverordnung?"
          ],
          "description": "Der Kunde möchte wissen, was die Energieeinsparverordnung (EnEV) ist.",
          "texts": [
            {
              "text": "Bei der Energieeinsparverordnung (EnEV) handelt es sich um eine Verordnung über energiesparenden Wärmeschutz und energiesparende Anlagentechnik bei Gebäuden.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-08T10:20:53.000Z"
        },
        {
          "name": "Energiespartipps",
          "intent": "SM_saveEnergy",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche Stromspartipps?",
            "Habt ihr Energiespartipps?",
            "Hast du Tipps, wie man Energie spart?"
          ],
          "description": "Der Kunde möchte Energiespartipps",
          "texts": [
            {
              "text": "Wer wenig Energie verbraucht, schont das Klima, fördert die Energiewende – und spart bares Geld.\\\n💡 Schau dir unsere **Tipps zum Energiesparen** an!",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Energiespartipps ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Entlastungspaket",
          "intent": "reliefPackage",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Werden die Maßnahmen aus dem Entlastungspaket automatisch auf meinen Vertrag angewendet?",
            "Was wurde im Entlastungspaket beschlossen?"
          ],
          "description": "Der Kunde sucht Informationen zu den Entlastungspaketen und damit verbundenen, energiepolitischen Maßnahmen.",
          "texts": [
            {
              "text": "Im Rahmen des **dritten Entlastungspakets** wurden von der Bundesregierung auch **energiepolitische Maßnahmen** beschlossen:\n\nEine **Strompreisbremse** soll Verbrauchern eine **Basisversorgung zu billigeren Preisen** ermöglichen. Erst ab einem gewissen Mehrverbrauch dürften Strompreise über ein gewisses Limit erhöht werden.\n\nDarüber hinaus ist geplant, den **Anstieg der Netzentgelte** zu **verringern**. Diese sind Bestandteil der Strompreise und werden somit von den Endverbrauchern getragen.\n\nZudem soll die zum 01.01.2023 angesetzte **Erhöhung des CO2-Preises um ein Jahr verschoben** werden. Der CO2-Preis für fossile Brennstoffe wie Benzin, Diesel, Heizöl und Erdgas würde sonst um fünf Euro pro Tonne steigen.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Weitere Informationen ↗",
                  "value": "https://www.bundesregierung.de/breg-de/themen/deutsche-einheit/drittes-entlastungspaket-2082584",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-09-14T12:23:36.000Z"
        },
        {
          "name": "Erdgassteuer",
          "intent": "ID_gasTax",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie ist die Höhe der Erdgassteuer?",
            "Erkläre mir, was die Erdgassteuer bedeutet.",
            "Erdgassteuer, was ist das?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur Erdgassteuer",
          "texts": [
            {
              "text": "Die Gassteuer ist eine **gesetzlich geregelte Verbrauchssteuer**, die seit 1999 auf Grund des Gesetzes zur ökologischen Steuerreform erhoben wird. Besteuert wird der **Verbrauch bzw. die Entnahme aus dem Netz** im deutschen Steuergebiet.\\\nDie Energiesteuer für Erdgas wird **vom Energieversorger erhoben** und an den Fiskus abgeführt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Was ist die Gasumlage?",
                  "value": "Was ist die Gasumlage?",
                  "answer_config": 69128,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Erklärung Kilowatt-peak",
          "intent": "kiloWatt",
          "entity": {
            "entityName": "kiloWatt_L",
            "normalizedEntityValue": "kwp"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Erläuterung, was eine Kilowatt-peak ist.",
          "texts": [
            {
              "text": "Kilowatt-Peak (kWp) ist ein Maß für die Leistung einer Photovoltaikanlage.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Erklärung Kilowattstunde",
          "intent": "kiloWatt",
          "entity": {
            "entityName": "kiloWatt_L",
            "normalizedEntityValue": "kwh"
          },
          "utterances": [
            "Warum wird der Stromverbrauch in kWh ausgewiesen?",
            "Was sagt die Kilowattstunde aus?",
            "Was bedeutet kWh?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, was eine Kilowattstunde ist.",
          "texts": [
            {
              "text": "Die **Kilowattstunde (kWh)** ist eine Maßeinheit für die Energie.\\\n1️⃣ **Kilowattstunde** ist die **Energie**, die ein Gerät mit einer Leistung von 1️⃣ **Kilowatt** (bzw. 1000 Watt) in 1️⃣ **Stunde** verbraucht oder produziert. ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Gaspreisbremse",
          "intent": "gasPriceBrake",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Gaspreisbremse",
          "texts": [
            {
              "text": "Um Kunden vor den steigenden Preisen am Energiemarkt zu schützen führt die Bundesregierung **eine Gas- und Wärmepreisbremse** ein.\n\nIm ersten Schritt **übernimmt der Staat für Gas- und Wärmekunden den im Dezember fälligen Abschlag (Soforthilfegesetz).**\n\n*   Bei vorhandenem Lastschriftmandat musst du nichts tun. Wir werden im Dezember keinen Lastschrift-Einzug durchführen.\n*   In anderen Fällen musst du die Überweisung unterbinden. Solltest du uns dennoch den Abschlag zahlen, so wird dieser im Rahmen deiner Jahresrechnung entsprechend berücksichtigt.\n\nIm zweiten Schritt wirst du **ab dem 01.März 2023** durch eine Deckelung des Gaspreises weiter entlastet. Die Deckelung liegt für 80% des Gasverbrauchs (Referenz: Vorjahr) bei 12 ct/kWh für Gas und bei 9,5 ct/kWh für Fernwärme. **Dies gilt rückwirkend zum 01.Januar 2023.**",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Energiemarkt aktuell",
                  "value": "Aktuelle Lage am Energiemarkt",
                  "answer_config": 69115,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Informationen zur Gaspreisbremse ↗",
                  "value": "https://www.bundesregierung.de/breg-de/themen/entlastungen-im-ueberblick/strompreisbremse-2125002",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-10-06T09:03:15.000Z"
        },
        {
          "name": "Gasumlage",
          "intent": "gasApportionment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über die Gasumlage erfahren.",
          "texts": [
            {
              "text": "Die wichtigste Antwort vorab: **Die geplanten Gasumlage wird nicht eingeführt!** Somit kommt es zu keiner zusätzlichen Belastung deiner Gasrechnung 😊\n\nGasimporte aus Russland sind nur noch eingeschränkt möglich. Zur Kompensierung der Lieferausfälle muss Gas zu höheren Preisen beschafft werden. Die Bundesregierung hatte geplant die zusätzlichen Beschaffungskosten ab dem 01.10.2022 in Form einer Umlage an die Verbraucher weitergegeben. Aufgrund der Verstaatlichung der Unternehmen Uniper und SEFE wurde am 30.09.2022 entschieden die **Umlage nicht umzusetzen**.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Weitere Informationen ↗",
                  "value": "https://www.bundesregierung.de/breg-de/themen/klimaschutz/gaspreisanpassung-umlage-2068832",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-08-05T11:30:42.000Z"
        },
        {
          "name": "Grundpreis",
          "intent": "ID_basicPrice",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Jahresgrundpreis auf meiner Rechnung erklären.",
            "Erkläre mir, was der Grundpreis ist.",
            "Basispreis auf der Rechnung erklären."
          ],
          "description": "Der Kunde möchte wissen, was der Grundpreis ist",
          "texts": [
            {
              "text": "Der **Grundpreis** ist eine monatliche pauschale Grundgebühr, die unabhängig vom Verbrauch anfällt.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Information zu Preisanpassungen",
          "intent": "infoAboutPriceIncrease",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie erfahre ich von Preisanpassungen?"
          ],
          "description": "Der Kunde hat allgemein Fragen zu geplanten oder geschehenen Preisanpassungen.",
          "texts": [
            {
              "text": "Du hast eine Frage zur **Preisanpassung**?\n\nUnten findest du häufige Themen. Natürlich kannst du auch eine eigene Frage im Chat stellen.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Fragen zum Abschlag",
                  "value": "Fragen zum Abschlag",
                  "answer_config": 69061,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Gründe der Preisanpassung",
                  "value": "Gründe der Preisanpassung",
                  "answer_config": 69075,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Preisgarantie",
                  "value": "Preisgarantie",
                  "answer_config": 69277,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Vertragsmöglichkeiten prüfen",
                  "value": "Vertragsmöglichkeiten prüfen",
                  "answer_config": 69264,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-11-29T15:45:08.000Z"
        },
        {
          "name": "Information zum Preisanpassungsschreiben",
          "intent": "infoAboutPriceIncrease",
          "entity": {
            "entityName": "priceAdjustmentLetter_L",
            "normalizedEntityValue": "Preisanpassungsschreiben"
          },
          "utterances": [
            "Wieso ist im Preisanpassungsschreiben keine Anpassung des Abschlags enhalten?"
          ],
          "description": "Der Kunde hat allgemein Fragen zum Preisanpassungsschreiben.",
          "newIntent": false,
          "creationTimestamp": "2022-11-29T15:45:08.000Z"
        },
        {
          "name": "Information zur aktuellen Marktlage",
          "intent": "currentMarketSituation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie ist die aktuelle Entwicklung auf dem Energiemarkt?",
            "Was passiert auf dem Gasmarkt?"
          ],
          "description": "Der Kunde möchte aktuelle Informationen zur Lage auf dem Energiemarkt.",
          "texts": [
            {
              "text": "Informationen zu **aktuellen** **Themen und Entwicklungen auf dem Energiemarkt** haben wir hier für dich zusammengestellt 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Entlastungspaket",
                  "value": "Entlastungspaket",
                  "answer_config": 69259,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Gaspreisbremse",
                  "value": "Gaspreisbremse",
                  "answer_config": 69129,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Gasumlage",
                  "value": "Gasumlage",
                  "answer_config": 69128,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Mehrwertsteuersenkung",
                  "value": "Mehrwertsteuersenkung",
                  "answer_config": 69398,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Strompreisbremse",
                  "value": "Strompreisbremse",
                  "answer_config": 69248,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-11-03T10:13:37.000Z"
        },
        {
          "name": "Kilowattstunde/Kilowatt-peak",
          "intent": "kiloWatt",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Erläuterung, was der Unterschied zwischen einer Kilowattstunde und einer Kilowatt-peak ist.",
          "texts": [
            {
              "text": "Kilowatt-Peak (kWp) ist ein Maß für die Leistung einer Photovoltaikanlage. Die Kilowattstunde (kWh) dagegen ist eine Maßeinheit für die Energie. 1 Kilowattstunde ist die Energie, die ein Gerät mit einer Leistung von einem Kilowatt (bzw. 1000 Watt) in einer Stunde verbraucht oder produziert.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Konzessionsabgabe",
          "intent": "ID_concessionFee",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erkläre mir, was die Konzessionsabgabe bedeutet.",
            "Welche Konzessionsabgabe muss ich zahlen?",
            "Wie hoch ist die Konzessionsabgabe?"
          ],
          "description": "Der Kunde möchte eine Erläuterung was die Konzessionsabgabe ist",
          "texts": [
            {
              "text": "Gemeinden erhalten von Netzbetreibern eine **Konzessionsabgabe (KA)** 💰 als Gegenleistung für die Verwendung der öffentlichen Straßen und Wege zur Verlegung von Strom- und Gasleitungen. Die Höhe ist in der **Konzessionsabgabenverordnung (KAV)** geregelt und richtet sich nach Ihrem **Energieliefervertrag** und teilweise auch nach der **Einwohnerzahl der Gemeinde**.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kostenübernahme Energiekosten durch Jobcenter",
          "intent": "SM_jobCenterCostAbsorption",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich bei Hartz IV Zuschüsse zu meiner Rechnung?",
            "Wisst ihr, ob das Arbeitsamt meine Stromkosten übernimmt?",
            "Unterstützt das Sozialamt mich bei meiner Rechnung?"
          ],
          "description": "Der Kunde will wissen, ob das Jobcenter Energiekosten übernimmt",
          "texts": [
            {
              "text": "Wenn du Bürgergeld beziehst, übernimmt dein Jobcenter deine Gas- und Heizkosten.\nStrom ist ein Posten, der **nicht** von deinem Jobcenter bezahlt wird. Die Stromkosten sind Teil des Bürgergeld-Regelsatzes.\n\nZur Übernahme der Stromkosten durch das Arbeitsamt können wir dich daher leider nicht beraten 🙁.\n\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "KWKG-Umlage",
          "intent": "ID_kwkgApportionment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wer kommt für die KWKG-Umlage auf?",
            "Was ist die KWKG-Umlage?",
            "Wie hoch ist die KWGK Umlage?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur KWKG-Umlage.",
          "texts": [
            {
              "text": "Mit der **KWKG-Umlage** wird die Erzeugung von Strom aus Kraft-Wärme-Kopplungsanlagen gefördert. Der Stromnetzbetreiber zahlt für den so erzeugten Strom einen Zuschlag an den Anlagenbetreiber. Die KWKG-Umlage beträgt für das Jahr ##year##: **##kwkg##** cent/kWh\n\nWeitere Informationen findest du unter 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Netztransparenz.de ↗",
                  "value": "https://www.netztransparenz.de/KWKG/KWKG-Umlagen-Uebersicht",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Leistungspreis",
          "intent": "ID_demandRate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wofür steht der Leistungspreis?",
            "Was bedeutet Leistungspreis?",
            "Erkläre mir den Leistungspreis."
          ],
          "description": "Der Kunde möchte wissen, was der Leistungspreis ist",
          "texts": [
            {
              "text": "Bei großen Abnahmestellen ab 100.000 kWh (Strom) sowie 1.500.000 kWh (Gas) wird **zusätzlich zum Arbeitspreis ein Leistungspreis erhoben.**\\\n\\\n💡 Der Leistungspreis ist Teil der Grundkosten und tritt in der Regel **nicht bei Privathaushalten und Kleingewerben**, sondern **nur bei größeren Unternehmen** auf. Der Leistungspreis ergibt sich aus der maximalen Leistungsaufnahme innerhalb eines Jahres.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Marktlokation",
          "intent": "ID_marketLocation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist die Marktlokations-Identifikationsnummer?",
            "Wo finde ich die Malo-ID?",
            "Was ist eine Marktlokation?"
          ],
          "description": "Der Kunde möchte wissen,was \"Marktlokation\" bedeutet",
          "texts": [
            {
              "text": "An einer **Marktlokation** wird Energie entweder erzeugt oder verbraucht. Das Objekt ist mit mindestens einer Leitung mit dem Netz verbunden.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Messlokation",
          "intent": "ID_meteringLocation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Verstehe nicht, was Messlokation ist.",
            "Was bedeutet Messlokation?",
            "Wo finde ich die Messlokation?"
          ],
          "description": "Der Kunde möchte wissen, was \"Messlokation\" bedeutet",
          "texts": [
            {
              "text": "Eine **Messlokation** 📐 ist ein Ort, an dem Energie gemessen wird und der alle technischen Einrichtungen beinhaltet, die zur Ermittlung und Übermittlung der Messwerte erforderlich sind.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Messstellenbetrieb",
          "intent": "SM_meteringPointOperation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche Informationen zum Messstellenbetrieb.",
            "Wer kümmert sich um den Betrieb der Messstelle?",
            "Wofür ist der Messstellenbetreiber zuständig?"
          ],
          "description": "Der Kunde möchte erfahren, wer sein Messstellenbetreiber ist und welche Aufgaben der Messstellenbetreiber hat.",
          "texts": [
            {
              "text": "Zum Themengebiet Messstellenbetreiber habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Netzbetrieb",
          "intent": "SM_powerGridOperator",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Fragen zu den Stadtwerken als Netzbetreiber?",
            "Betreut ihr die Netze?",
            "Bietet ihr Netz-Services an?"
          ],
          "description": "Der Kunde möchte erfahren, wer sein Netzbetreiber ist und welche Aufgaben der Netzbetreiber hat.",
          "texts": [
            {
              "text": "Netzbetreiber sind per Gesetz zuständig für den **Aufbau, Ausbau und die Erhaltung der Strom- und Gasnetze** in ihrem Netzgebiet.\\\n\\\n💡 Zu ihren Aufgaben zählen unter anderem die **sachgemäße Wartung von Leitungen** und die **Betreuung von Strom- und Gaszählern**. Der Strom, mit dem dein Lieferant Dich versorgt, fließt also durch die Leitungen deines örtlichen Netzbetreibers. Für die Nutzung dieses Netzes zahlt der Lieferant dem Netzbetreiber ein Entgelt. \n\nDer für eine Region **verantwortliche Netzbetreiber variiert** je nach Postleitzahlengebiet. Den für Dich zuständigen Netzbetreiber findest Du auf deiner letzten Jahresrechnung 📄.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Netze ↗",
                  "value": "https://stadtwerk.bot",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Netzentgelte",
          "intent": "ID_gridUtilisationCosts",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Woher kommen die Kosten für die Netznutzung?",
            "Warum muss ich Netznutzungsentgelte bezahlen?",
            "Brauche Informationen zum Netznutzungsentgelt?"
          ],
          "description": "Der Kunde möchte eine Auskunft zu bestehenden Netzentgelten",
          "texts": [
            {
              "text": "Für die **Nutzung des Verteilnetzes** wird deinem Energieversorger ein sogenanntes **Netznutzungsentgelt** für den Transport und die Verteilung der Energie berechnet. Diese werden auf deiner Energierechnung ausgewiesen. Die Höhe wird dem Netzbetreiber durch die Bundesnetzagentur genehmigt.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Niederschlagswasser",
          "intent": "SM_rainwater",
          "entity": {
            "entityName": "fees",
            "normalizedEntityValue": "Niederschlagswassergebühr"
          },
          "utterances": [
            "An wen melde ich mich wenn es um Regenwasser geht?",
            "Seid ihr für Niederschlagswasser verantwortlich?"
          ],
          "description": "Der Kunde möchte Informationen zu Niederschlagwasser und den Niederschlagswassergebühren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Offshore-Netzumlage",
          "intent": "ID_offshoreApportionment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Warum muss ich Offshore-Netzumlage zahlen?",
            "Was ist die Offshore-Umlage?",
            "Was kostet die Offshore-Umlage?"
          ],
          "description": "Der Kunde sucht Informationen zur Offshore-Umlage.",
          "texts": [
            {
              "text": "Die **Offshore-Netzumlage** wurde wegen möglicher Entschädigungszahlungen an Betreiber von Offshore-Windparks eingeführt, die für den verspäteten Anschluss an das Übertragungsnetz an Land oder wegen lang andauernder Netzunterbrechungen zu zahlen sind.\\\n\\\nSeit dem **1. Januar 2019** enthält die Umlage auch die Kosten für die Errichtung und den Betrieb der Anbindungsleitungen, die dann nicht mehr in den Netzentgelten enthalten sind.\\\nAb dem **01.01.##year##** ergibt sich eine Offshore-Netzumlage in Höhe von ##offshore## ct/kWh auf die nicht privilegierten Letztverbräuche.\\\n\\\nWeitere Informationen findest du unter 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Netztransparenz.de ↗",
                  "value": "https://www.netztransparenz.de/EnWG/Offshore-Netzumlage/Offshore-Netzumlagen-Uebersicht",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ökosteuer",
          "intent": "ID_ecoTax",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erkläre mir die Ökosteuer.",
            "Was ist die Ökosteuer?",
            "Informationen zur Ökosteuer."
          ],
          "description": "Der Kunde möchte eine Erklärung zur \"Ökosteuer\"",
          "texts": [
            {
              "text": "Der Begriff **\"Ökosteuer\"** dient seit 1999 als Sammelbegriff für Steuern, die auf den Verbrauch nicht erneuerbarer Energieträger, wie zum Beispiel Benzin, Kohle oder Gas erhoben werden.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Primärenergiefaktor",
          "intent": "primaryEnergyFactor",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erklärung zu fp",
            "Was bedeutet fp?",
            "Was ist der Primärenergiefaktor?"
          ],
          "description": "Der Kunde möchte wissen, was der Primärenergiefaktor (fp) ist.",
          "texts": [
            {
              "text": "Der Primärenergiefaktor **fp** drückt das Verhältnis von eingesetzter Energie zu gegebener Endenergie aus.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-08T10:20:53.000Z"
        },
        {
          "name": "Schmutzwasser",
          "intent": "SM_rainwater",
          "entity": {
            "entityName": "fees",
            "normalizedEntityValue": "Schmutzwassergebühr"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu Schmutzwasser und Schmutzwassergebühren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Soforthilfe",
          "intent": "immediateRelief",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zur Soforthilfe (Dezember 2022).",
          "texts": [
            {
              "text": "**Aktuelle Informationen zur Dezember-Soforthilfe für Gaskunden**\n\nUm den Mehrbelastungen durch die weiter steigenden Energiekosten zu begegnen, setzt die Bundesregierung gezielte Entlastungsmaßnahmen für die Bürgerinnen und Bürger um.\n\nAls ersten Schritt hat die sogenannte Dezember-Soforthilfe für Gas- und Wärmekunden am 14. November 2022 den Bundesrat passiert. \n\n**Damit entfällt die Abschlagszahlung für Dezember** unter anderem für private Haushalte.\n\n*   Bei vorhandenem Lastschriftmandat musst du nichts tun. Wir werden im Dezember keinen Einzug durchführen.\n*   In anderen Fällen musst du die Überweisung unterbinden. Solltest du uns dennoch den Abschlag zahlen, so wird dies im Rahmen deiner Jahresrechnung entsprechend berücksichtigt.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Weitere Informationen ↗",
                  "value": "https://www.bundesregierung.de/breg-de/themen/entlastungen-im-ueberblick/soforthilfe-dezember-2139268",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-11-18T12:19:54.000Z"
        },
        {
          "name": "Steuern und Abgaben",
          "intent": "ID_taxesAndDuties",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wer bestimmt die Abgaben?",
            "Welche Steuern muss ich bezahlen?",
            "Welche Abgaben und Steuern fallen an?"
          ],
          "description": "Der Kunde möchte Auskunft zu anfallenden Steuern und Abgaben",
          "texts": [
            {
              "text": "Zu **Beginn des Jahres ##year##** änderten sich die Höhe der gesetzlichen Umlagen und Abgaben, die in deinem Strompreis enthalten sind. Auf die **Höhe dieser Umlagen** haben wir als Energieversorger **leider keinen Einfluss** 🙁.\\\n\\\nWeitere Informationen findest du auf 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Netztransparenz.de ↗",
                  "value": "https://www.netztransparenz.de/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Stromkennzeichnung",
          "intent": "ID_electricityMix",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wofür steht die Kennzeichnung der Stromlieferung?",
            "Welche Bestandteile hat mein Strommix?",
            "Welche Bedeutung hat die Stromkennzeichnung?"
          ],
          "description": "Der Kunde möchte Informationen zur Stromkennzeichnung",
          "texts": [
            {
              "text": "Das **Energiewirtschaftsgesetz (EnWG)** schreibt die **Stromkennzeichnung** über die Herkunft des bezogenen Stroms und dessen Umweltauswirkungen vor. Weil Strom aus unterschiedlichen Quellen stammen kann, ist auch von **„Energiemix“** die Rede.\\\n\\\nAnhand der Stromkennzeichnung kannst du nachvollziehen, aus welchen Energieträgern dein Strom stammt und welche **Auswirkungen** diese Energieträger auf die **Umwelt** 🌍 haben.\\\n\\\nDamit die angegebenen Werte für dich **vergleichbar bleiben**, führen wir unsere Werte immer neben den **Durchschnittswerten für Deutschland** auf. ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Strompreisbremse",
          "intent": "powerPriceBrake",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Informationen zum Strompreisdeckel",
            "Was ist die Strompreisbremse?"
          ],
          "description": "Der Kunde möchte Informationen zur Strompreisbremse",
          "texts": [
            {
              "text": "Die Bundesregierung hat für das Jahr 2023 eine **Strompreisbremse** beschlossen mit Aussicht auf Verlängerung zum April 2024. Umgesetzt wird diese **ab dem März 2023**, jedoch gilt sie rückwirkend zum Januar 2023. Hierbei wird der Preis für 80% des Stromverbrauchs des Vorjahres bei 40 ct/kWh gedeckelt. Für den über das Verbrauchskontingent hinausgehenden Verbrauch gilt der vertraglich vereinbarte Preis.\n\nBei einem Verbrauch kleiner 30.000 kWh wird der monatliche Entlastungsbetrag wie folgt berechnet:_**1/12 \\* aktuelle Verbrauchsprognose \\* 80% \\* (Gültiger Arbeitspreis - 40 ct/kWh)**_\n\n**Für dich als Kundin/Kunde besteht kein Handlungsbedarf. Deinen Abschlag werden wir nach Verabschiedung des Gesetzes entsprechend anpassen.**",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Informationen zur Strompreisbremse ↗",
                  "value": "https://www.bundesregierung.de/breg-de/themen/entlastungen-im-ueberblick/strompreisbremse-2125002",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-11-16T08:53:24.000Z"
        },
        {
          "name": "Stromsteuer",
          "intent": "ID_electricityTax",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Warum muss ich die Stromsteuer bezahlen?",
            "Was ist die Stromsteuer?",
            "Wer bekommt meine Stromsteuer?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur Stromsteuer",
          "texts": [
            {
              "text": "Die **Stromsteuer** ist eine bundesgesetzlich geregelte **Verbrauchsteuer auf elektrischen Strom**.\\\n\\\n💡 Mit ihr wird der Verbrauch von elektrischem Strom innerhalb des deutschen Steuergebiets besteuert. Es handelt sich um eine in der Europäischen Union **harmonisierte Verbrauchsteuer**.Die Stromsteuer wird vom Energieversorger erhoben und an den Staat abgeführt.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Thermische Gasabrechnung",
          "intent": "ID_thermalGasBilling",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie viel kWh entspricht 1 m3 Gas?",
            "Wie hoch ist der Brennwert von Erdgas?",
            "Wie berechnet sich der Gasverbrauch?"
          ],
          "description": "Der Kunde möchte eine Erläuterung zur thermischen Gasabrechnung",
          "texts": [
            {
              "text": "**Erdgas ist ein Naturprodukt** und weist daher unterschiedliche Energiegehalte auf.\\\n\\\nFür die **Ermittlung deines Energieverbrauchs** erfolgt eine Umrechnung des verbrauchten Gasvolumens in Kubikmetern mithilfe der Zustandszahl und des Brennwerts in Kilowattstunden. Der **Brennwert** 🔥 beschreibt den **Energiegehalt**⚡, der in einem Kubikmetern Gas enthalten ist. Die Zustandszahl berücksichtigt die Höhenlage der Verbrauchsstelle.\n",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Umstellung von L- zu H-Gas",
          "intent": "SM_gasConversion",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich will Informationen zur Erdgasumstellung.",
            "Wieso H-Gas statt L-Gas?",
            "Kannst du mir etwas zur Marktraumumstellung Erdgas sagen?"
          ],
          "description": "Der Kunde möchte  zur Umstellung von L- zu H- Gas",
          "texts": [
            {
              "text": "In den nächsten Jahren erfolgt der **Aus- und Umbau des deutschen Erdgasnetzes**.\n\nIn den nördlichen und westlichen Landesteilen wird die schrittweise Umstellung **von L-Gas auf H-Gas** bis zum Jahr 2030 durchgeführt.\n\n 💡 Dies ist **notwendig**, da der **Import** von niederländischem **L-Gas** zu diesem Zeitpunkt ausläuft und die einheimische Produktion **rückläufig** ist.\n\nWeitere Informationen findest du unter folgendem Link 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Marktumstellung Gas ↗",
                  "value": "https://de.wikipedia.org/wiki/Erdgas#Marktraumumstellung",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Unterschied Grund- &  Ersatzversorger",
          "intent": "SM_basicOrReplacementSupplier",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Benötige ich die Grund- oder die Ersatzversorgung?",
            "Was ist ein Ersatzversorger? ",
            "Bei welchen Energiearten kann es zu Ersatz- oder Grundversorgung kommen?"
          ],
          "description": "Der Kunde möchte eine Darstellung des Unterschieds zwischen Grund- und Ersatzversorger",
          "texts": [
            {
              "text": "Der Unterschied zwischen Grund- und Ersatzversorgung wird hier beschrieben 👇",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Verbrauchsprognose",
          "intent": "projectedConsumption",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Welcher Jahresverbrauch wird prognostiziert, wenn kein Referenzverbrauch vorliegt?",
            "Ich bin letztes Jahr umgezogen, welcher Verbrauchswert wird jetzt angenommen?"
          ],
          "description": "Der Kunde möchte wissen welche Verbrauchsprognose zur Berechnung der Preisbremsen für ihn genutzt wurden.",
          "newIntent": true,
          "creationTimestamp": "2023-02-27T12:18:02.000Z"
        },
        {
          "name": "Verbrauchsprognose Gas",
          "intent": "projectedConsumption",
          "entity": {
            "entityName": "priceControls",
            "normalizedEntityValue": "Gaspreisbremse"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen welche Verbrauchsprognose zur Berechnung der Gaspreisbremsen für ihn genutzt wurden.",
          "newIntent": false,
          "creationTimestamp": "2023-02-27T12:18:02.000Z"
        },
        {
          "name": "Verbrauchsprognose Strom",
          "intent": "projectedConsumption",
          "entity": {
            "entityName": "priceControls",
            "normalizedEntityValue": "Strompreisbremse"
          },
          "utterances": [
            "Welchen Referenzwert nutzt ihr zur Berechnung der Strompreisbremse?"
          ],
          "description": "Der Kunde möchte wissen welche Verbrauchsprognose zur Berechnung der Strompreisbremsen für ihn genutzt wurden.",
          "newIntent": false,
          "creationTimestamp": "2023-02-27T12:18:02.000Z"
        },
        {
          "name": "Versorgungssicherheit",
          "intent": "supplySecurity",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibt es Alternativen, falls wir kein Gas mehr aus dem Ausland bekommen?",
            "Haben wir genügend Energiereserven?",
            "Ist die Versorgung mit Energie in Deutschland sichergestellt?"
          ],
          "description": "Der Kunde möchte wissen, ob die Versorgung mit Energie auf Dauer und auch während Krisenzeiten sichergestellt ist.",
          "texts": [
            {
              "text": "Die Bundesnetzagentur veröffentlicht tagesaktuelle Informationen zu den Themen **Versorgungssicherheit** und **Notfallplan Gas**  \r \r Unter dem folgenden Link finden Sie die aktuellen Informationen 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Bundesnetzagentur ↗",
                  "value": "https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/Versorgungssicherheit/aktuelle_gasversorgung/start.html",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-14T13:08:31.000Z"
        },
        {
          "name": "Wärmeschutzverordnung",
          "intent": "thermalInsulationOrdinance",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was bedeutet WSVO?",
            "Was ist die Wärmeschutzverordnung?",
            "Erklärung zu WSVO"
          ],
          "description": "Der Kunde möchte wissen, was die Wärmeschutzverordnung (WSVO) ist.",
          "texts": [
            {
              "text": "Bei der Wärmeschutzverordnung (WSVO) handelt es sich um eine Verordnung über einen energiesparenden Wärmeschutz bei Gebäuden.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-08T10:20:53.000Z"
        },
        {
          "name": "Zusammensetzung des Strom-/Gaspreises",
          "intent": "ID_priceComposition",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, woraus sich der Strom- oder Gaspreis zusammensetzt.",
          "texts": [
            {
              "text": "Strom- und Gaspreis setzen sich im Wesentlichen aus drei Komponenten zusammen. Dem Preis für Beschaffung und Vertrieb, den Netznutzungsentgelten und den staatlich veranlassten Preisbestandteilen. Darunter fallen Steuern, sowie Umlagen. Die Zusammensetzung im Detail:",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Zusammensetzung Gaspreis ↗",
                  "value": "https://www.bmwk.de/Redaktion/DE/Textsammlungen/Energie/strompreise.html?cms_artId=241534",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zusammensetzung Strompreis ↗",
                  "value": "https://www.bmwk.de/Redaktion/DE/Textsammlungen/Energie/strompreise.html",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-09-24T14:55:05.000Z"
        },
        {
          "name": "Zusammensetzung des Wärmepreises",
          "intent": "ID_priceComposition",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Wärme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, woraus sich der Wärmepreis zusammensetzt.",
          "newIntent": false,
          "creationTimestamp": "2021-09-24T14:55:05.000Z"
        }
      ]
    },
    {
      "SkillName": "EEG",
      "Intents": [
        {
          "name": "Bearbeitungsstand ",
          "intent": "processingStatusEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zum Prozess oder dem aktuellen  Bearbeitungsstand der EEG-Anlage",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Betreiberwechsel von einer EEG-Anlage",
          "intent": "changeEEGOperator",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen und benötigt Informationen für den Fall eines Betreiberwechsels einer PV-/EEG-Anlage",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG Direktvermarktung (Informationen)",
          "intent": "infoCompensationEEG",
          "entity": {
            "entityName": "CompensationType_L",
            "normalizedEntityValue": "Direktvermarktung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Direktvermarktung für EEG-Anlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG Einspeisevergütung (Informationen)",
          "intent": "infoCompensationEEG",
          "entity": {
            "entityName": "CompensationType_L",
            "normalizedEntityValue": "Einspeisevergütung EEG"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Einspeisevergütung für EEG-Anlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Abrechnung",
          "intent": "billingInfoEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zu seinen EEG-Abrechnungen oder möchte die bisherigen Auszahlungen seiner EEG-Vergütung einsehen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen (Allgemeine Prozesse)",
          "intent": "generalEEGProcess",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat allgemeine Fragen zur Anmeldung einer EEG-Anlage",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen (Spezifische Prozesse)",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zu den einzelnen Prozessschritte einer EEG-Anmeldung",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Einspeisebestätigung",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Einspeisebestätigung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zum Prozessschritt Einspeisebestätigung.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Einspeisezusage",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Einspeisezusage"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zum Prozessschritt Einspeisezusage.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Fertigmeldung",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Fertigmeldung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zum Prozessschritt Fertigmeldung.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Inbetriebnahme",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Inbetriebnahme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zum Prozessschritt der Inbetriebnahme.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Kundendatenblatt",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Kundendatenblatt"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zum Kundendatenblatt.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Anlagen Netzprüfung",
          "intent": "specificEEGProcess",
          "entity": {
            "entityName": "ProcessingSteps_L",
            "normalizedEntityValue": "Netzprüfung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte spezifische Informationen zur Netzprüfung.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Messkonzepte",
          "intent": "measuringConceptEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist das richtige Messkonzept?",
            "Wer meldet das Messkonzept?",
            "Wo muss ich das Messkonzept melden?"
          ],
          "description": "Der Kunde möchte sich im Kontext der Einspeisung über mögliche Messkonzepte informieren.",
          "newIntent": true,
          "creationTimestamp": "2022-02-03T14:43:43.000Z"
        },
        {
          "name": "EEG-Vergütung (Abrechnung und Steuern)",
          "intent": "compensationEEGTaxes",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, wie  EEG-Abrechnungen steuerlich behandelt werden und was er hierüber wissen muss",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Vergütung (Änderung der Vergütungsform)",
          "intent": "changeCompensationEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Möglichkeit des Wechsels von einer zu einer anderen Vergütungsformen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Vergütung (Antrag und Auszahlung)",
          "intent": "infoGetCompensationEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wann erhalte ich die Vergütung für meine PV-Anlage?",
            "Wann kommt die Einspeisevergütung?",
            "Wann wird die EEG-Vergütung ausbezahlt?"
          ],
          "description": "Der Kunde hat Rückfragen, wie und wann er eine EEG-Vergütung erhält.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Vergütung (Informationen)",
          "intent": "infoCompensationEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist die EEG-Vergütung?",
            "Einspeisevergütung vs. Direktvermarktung",
            "Welche EEG-Vergütungsformen gibt es?"
          ],
          "description": "Der Kunde möchte Informationen zu den verschiedenen Vergütungsformen für EEG-Anlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "EEG-Vergütung (Vergütungssätze)",
          "intent": "infoCompensationRateEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie hoch ist die Einspeisevergütung?",
            "Wie sehen die aktuellen Vergütungssätze bei Einspeisung aus?",
            "Wie viel Cent pro kWh erhalte ich bei Einspeisung meines Solarstroms?"
          ],
          "description": "Der Kunde möchte wissen, wie hoch die EEG-Vergütungssätze sind.",
          "newIntent": true,
          "creationTimestamp": "2022-02-25T13:36:18.000Z"
        },
        {
          "name": "EEG-Vergütung Sonstige Förderung (Informationen)",
          "intent": "infoCompensationEEG",
          "entity": {
            "entityName": "CompensationType_L",
            "normalizedEntityValue": "SonstigeFörderung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu sonstigen Vergütungsformen für EEG-Anlagen, die über Direktvermarktung und Einspeisevergütung hinaus gehen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Eigenverbrauch von Strom Abrechnung",
          "intent": "privateConsumptionBilling",
          "entity": {
            "entityName": "energyConsumption_L",
            "normalizedEntityValue": "Eigenverbrauch"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, wieso er den Eigenverbrauch von Strom auf der EEG-Abrechnung nicht sieht.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Eigenverbrauch von Strom Strombezug",
          "intent": "privateConsumptionBilling",
          "entity": {
            "entityName": "energyConsumption_L",
            "normalizedEntityValue": "Stromverbrauch"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, wieso sein Strombezug nicht in der EEG-Abrechnung berücksichtigt wird.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Eigenverbrauch von Strom Übersicht",
          "intent": "privateConsumptionBilling",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, wieso er den Eigenverbrauch von Strom auf der EEG-Abrechnung nicht sieht und erhält hier eine Übersicht zum Eigenverbrauch und Strombezug",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Einspeisemengen prüfen",
          "intent": "checkFeedingHistory",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Übersicht historie meiner Einspeisungen",
            "Wie viel Strom habe ich eingespeist?",
            "Wo kann ich die historischen Einspeisungen einsehen?"
          ],
          "description": "Der Kunde möchte eine Übersicht zu seinen bisherigen Einspeisemengen einsehen.",
          "newIntent": true,
          "creationTimestamp": "2022-06-01T08:41:57.000Z"
        },
        {
          "name": "Erzeugungs- und Einspeisemenge",
          "intent": "feedingAndGenerationVolume",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie wird die Einspeisemenge berechnet?",
            "Was ist die Einspeisemenge?",
            "Wie hängt die Einspeisemenge mit der Erzeugungsmenge zusammen?"
          ],
          "description": "Der Kunde möchte eine Definition der Erzeugungs- oder Einspeisemenge und sich über die Unterschiede informieren",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Biogasanlagen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Biogas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Biogasanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Biomasseanlangen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Biomasse"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Biomasseanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Blockheizkraftwerken",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "BHKW"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Blockheizkraftwerken (BHKW).",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Deponiegasanlagen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Deponiegas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Deponiegasanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu EEG-Anlagen (außer PV)",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu verschiedenen EEG-Anlagentypen (PV ausgenommen).",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Klärgasanlagen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Klärgas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Klärgasanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Wasserkraftanlagen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Wasserkraft"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Wasserkraftanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Windkraftanlagen",
          "intent": "EEGSystemType",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Windkraft"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu Windkraftanlagen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Laufnummer",
          "intent": "sequenceNumber",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist eine Laufnummer?",
            "Wo finde ich die Laufnummer?",
            "Steht die Laufnummer auf der PV-Anlage?"
          ],
          "description": "Der Kunde möchte wissen, was die Laufnummer ist und wo er sie finden kann.",
          "newIntent": true,
          "creationTimestamp": "2022-03-11T12:26:03.000Z"
        },
        {
          "name": "Marktstammdatenregister (Informationen)",
          "intent": "infoMastr",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zum Marktstammdatenregister",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Mono- und Polymodule",
          "intent": "infoPVModule",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über den Unterschied von Poly- und",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "PV-Anlagen (Änderungen)",
          "intent": "changesONPV",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wechselrichter der Solaranlage tauschen",
            "Wie kann ich die Änderung eines Wechselrichters melden?",
            "Muss ich den Austausch eines Wechselrichters melden?"
          ],
          "description": "Der Kunde fragt, ob und wo Änderungen an der PV-Anlage gemeldet werden müssen.",
          "newIntent": false,
          "creationTimestamp": "2021-08-17T13:31:19.000Z"
        },
        {
          "name": "PV-Anlagen (Informationen)",
          "intent": "PVSystemType",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zu PV-Anlagen, z. B. zu den verschiedenen Typen.",
          "newIntent": true,
          "creationTimestamp": "2022-04-05T07:36:22.000Z"
        },
        {
          "name": "PV-Anlagen (Modultausch)",
          "intent": "changeEEGModule",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zum Austausch von PV-Modulen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "PV-Anlagen mit Speicher (Informationen)",
          "intent": "PVSystemType",
          "entity": {
            "entityName": "pvType_L",
            "normalizedEntityValue": "Stromspeicher"
          },
          "utterances": [
            "Welche Vorteile bietet eine PV- Anlage mit Stromspeicher?",
            "Was ist eine PV-Anlage mit Stromspeicher?"
          ],
          "description": "Der Kunde sucht Informationen zu PV-Anlagen mit Speicher.",
          "newIntent": false,
          "creationTimestamp": "2022-04-05T07:36:22.000Z"
        },
        {
          "name": "PV-Pflicht",
          "intent": "PVRequirement",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gesetzliche Vorgaben zur Photovoltaik Pflicht",
            "Besteht die Solarpflicht auch für Privatpersonen?",
            "Ab wann gilt die Photovoltaik-Pflicht?"
          ],
          "description": "Der Kunde hat eine Frage rund um die Rahmenbedingungen der Photovoltaik-Pflicht.",
          "newIntent": true,
          "creationTimestamp": "2022-05-13T07:46:06.000Z"
        },
        {
          "name": "Redispatch 2.0",
          "intent": "infoFeedInManagement",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zum Redispatch 2.0 und Einspeisemanagement.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung BHKW",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "BHKW"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will ein (neues) Blockheizkraftwerk registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung Biogasanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Biogas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Biogasanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung Biomasseanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Biomasse"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Biomasseanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung Deponiegasanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Deponiegas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Deponiegasanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung EEG-Anlagen (außer PV)",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine EEG-(Neu-)Anlage registrieren (PV ausgenommen).",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung Klärgasanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Klärgas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Klärgasanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung PV-Anlagen",
          "intent": "registerPVSystem",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte meine Photovoltaik-Anlage anmelden",
            "Wie kann ich mein Balkonkraftwerk anmelden?",
            "Ich will eine PV-Anlage anmelden."
          ],
          "description": "Der Kunde sucht Informationen zur Registrierung einer PV-Anlage.",
          "newIntent": true,
          "creationTimestamp": "2022-04-05T07:36:55.000Z"
        },
        {
          "name": "Registrierung PV-Anlagen mit Speicher",
          "intent": "registerPVSystem",
          "entity": {
            "entityName": "pvType_L",
            "normalizedEntityValue": "Stromspeicher"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zur Registrierung einer PV-Anlage mit Speicher.",
          "newIntent": false,
          "creationTimestamp": "2022-04-05T07:36:55.000Z"
        },
        {
          "name": "Registrierung steckerfertiger PV-Anlagen",
          "intent": "registerPVSystem",
          "entity": {
            "entityName": "pvType_L",
            "normalizedEntityValue": "Steckerfertig"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zur Registrierung einer steckerfertigen PV-Anlage.",
          "newIntent": false,
          "creationTimestamp": "2022-04-05T07:36:55.000Z"
        },
        {
          "name": "Registrierung Wasserkraftanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Wasserkraft"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Wasserkraftanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Registrierung Windkraftanlagen",
          "intent": "registerEEGSystem",
          "entity": {
            "entityName": "EEGSystemType_L",
            "normalizedEntityValue": "Windkraft"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine (neue) Windkraftanlage registrieren.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Rundsteuerung",
          "intent": "rippleControl",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wofür steht die Abkürzung TRE?",
            "Wo finde ich die zugehörigen Schaltbilder zum Rundsteuerempfänger?",
            "Was versteht man unter Rundsteuerung?"
          ],
          "description": "Der Kunde hat eine Frage zur Rundsteuerung (z. B. zum TRE).",
          "newIntent": true,
          "creationTimestamp": "2022-03-31T15:20:34.000Z"
        },
        {
          "name": "Rundsteuerung Fehlfunktion",
          "intent": "rippleControl",
          "entity": {
            "entityName": "malfunction_L",
            "normalizedEntityValue": "Fehlfunktion"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zur Fehlfunktion des Tarifschaltgeräts.",
          "newIntent": false,
          "creationTimestamp": "2022-03-31T15:20:34.000Z"
        },
        {
          "name": "Steckerfertige PV-Anlagen (Informationen)",
          "intent": "PVSystemType",
          "entity": {
            "entityName": "pvType_L",
            "normalizedEntityValue": "Steckerfertig"
          },
          "utterances": [
            "Was ist eine steckerfertige PV-Anlage?"
          ],
          "description": "Der Kunde sucht Informationen zu steckerfertigen PV-Anlagen.",
          "newIntent": false,
          "creationTimestamp": "2022-04-05T07:36:22.000Z"
        },
        {
          "name": "Stromanbieterwechsel bei Einspeisung",
          "intent": "changeSupplierEEG",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist es möglich den Energieversorger zu wechseln, obwohl ich Volleinspeisung betreibe?",
            "Können Solaranlagen - Besitzer den Stromanbieter wechseln?",
            "Stromanbieter wechseln beim Eigenverbrauch?"
          ],
          "description": "Der Kunde speist Strom in das Netz ein und will wissen ob er freie Lieferantenwahl hat",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zu Einspeisung",
          "intent": "EEGOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche Hilfe beim Thema Hausanschluss",
            "Ich habe eine Frage zum Hausanschluss",
            "Hausanschluss"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Einspesung.",
          "newIntent": true,
          "creationTimestamp": "2022-07-13T07:34:03.000Z"
        },
        {
          "name": "Umstellung des Verbrauchsmodus",
          "intent": "changeEEGConsumptionMode",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zu der Änderung seiner Verbrauchsform (wie bspw. von Eigenbedarf auf Volleinspeisung)",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Elektromobilität",
      "Intents": [
        {
          "name": "(Öffentliche) Ladestation",
          "intent": "SM_chargingStation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich bei ihnen Ladesäulen kaufen?",
            "Sind im Umkreis Ladesäulen für Elektrowagen vorhanden?"
          ],
          "description": "Der Kunde sucht eine Auskunft zu Ladestationen im Gebiet des Energieversorgers.",
          "texts": [
            {
              "text": "Weitere Informationen zu **Ladevorrichtungen** findest Du auf der folgenden Seite 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Ladestationen ↗",
                  "value": "https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/E-Mobilitaet/Ladesaeulenkarte/start.html",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Elektromobilität",
          "intent": "SM_emobility",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich benötige Informationen zu Elektromobilität.",
            "Ich möchte auf ein E-Fahrzeug umsteigen.",
            "Eure E-Mobility Produkte und Dienste?"
          ],
          "description": "Der Kunde sucht allgemeine Informationen zu Elektromobilitätsangeboten.",
          "texts": [
            {
              "text": "Du willst dich über unsere Angebote zu **E-Mobilität** 🚗 informieren? 🙂\n\nAlle Informationen findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Elektromobilität ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Elektromobilität für Geschäftskunden",
          "intent": "SM_emobility",
          "entity": {
            "entityName": "customerType_L",
            "normalizedEntityValue": "businessCustomers"
          },
          "utterances": [
            null
          ],
          "description": "Der Geschäftskunde sucht Informationen zu Elektromobilitätsangeboten.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Förderung von Elektromobilität",
          "intent": "eMobilityFunding",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Antrag auf Förderung eines Elektro-Fahrzeugs.",
            "Förderung Elektromobilität.",
            "Wo kann ich einen Bonus für ein Pedelec beantragen?"
          ],
          "description": "Der Kunde möchte mehr über Förderungsmöglichkeiten im Kontext von Elektromobilität erfahren.",
          "texts": [
            {
              "text": "**Die Förderung von Elektrofahrzeugen wurde durch die Bundesregierung neu ausgerichtet.**\n\nSeit dem **1. Januar 2023** konzentriert sich die Förderung durch den Umweltbonus auf  **batterie- und brennstoffzellenbetriebene Fahrzeuge**. \n\n**Plug-In-Hybridfahrzeuge** erhalten durch den Umweltbonus nun **keine Förderung** mehr. \n\nZudem bieten einige Bundesländer, Kommunen und Städte eigene Förderprogramme an. \n\nWeitere Informationen zu Fördermöglichkeiten für Elektrofahrzeuge findest du hier:",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Fördermöglichkeiten ↗",
                  "value": "https://www.kfw.de/inlandsfoerderung/Unternehmen/Energie-und-Umwelt/Nachhaltig-Mobil/Vier-F%C3%B6rderm%C3%B6gichkeiten.html",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:07.000Z"
        },
        {
          "name": "Ladeanschluss",
          "intent": "chargingConnection",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Welche Art von Ladekabel benötige ich?",
            "Was ist die minimale Leistung zum Starten eines Ladevorgangs?",
            "Kann ich mein Auto zuhause an der Steckdose laden?"
          ],
          "description": "Der Kunde möchte mehr über den Anschluss und die Anschlussbedingungen für Ladestrom erfahren.",
          "texts": [
            {
              "text": "Im Normalfall kann jedes Elektroauto an einer ganz normalen **Haushaltssteckdose** geladen werden. Hierfür braucht es ein **ICCB-Ladekabel**, außerdem sollte ein Elektriker prüfen, ob Ihre Hauselektrik dafür geeignet ist. 👷‍♂️\n \nWesentlich schneller geht der Ladevorgang mit einer **Wallbox*, diese muss allerdings von einem Elektriker installiert werden. ",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-05-30T12:16:38.000Z"
        },
        {
          "name": "Ladedauer",
          "intent": "chargingTime",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie lange dauert die Aufladung eines Elektrofahrzeugs?",
            "Wie lange dauert einmal Vollladen?",
            "Wie schnell lädt die Schnellladefunktion?"
          ],
          "description": "Der Kunde möchte wissen, wie lange die Aufladung eines Fahrzeugs dauert.",
          "texts": [
            {
              "text": "Die **Ladedauer** eines Elektroautos hängt von der **Batteriekapazität** und der **Ladeleistung** ab. \n\nAuch das **Modell des Fahrzeugs** und die Ladestation beeinflussen die Ladedauer.  \n\nZum Berechnen der Ladezeit deines E-Autos gibt es eine einfache Formel:\n\n**Akkukapazität (kWh) / Ladeleistung (kW)**  \n**\\= Ladezeit (h)**\n\nHiermit kannst du individuell die Ladezeit für dein eigenes Elektroauto berechnen.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:07.000Z"
        },
        {
          "name": "Ladekarte",
          "intent": "chargingCard",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Informationen zur Ladekarte",
            "Kann ich bei euch eine Ladekarte kaufen",
            "Wie wird der Ladevorgang mit Ladekarte abgerechnet"
          ],
          "description": "Der Kunde wünscht Informationen zum Erwerb oder der Verwendung einer Ladekarte für Elektrofahrzeuge.",
          "texts": [
            {
              "text": "Du kannst die **Musterwerke-Ladekarte** ganz bequem online bestellen. In der Regel erhältst du die Karte nach Bestelleingang **binnen 14 Tagen zugeschickt**. Ladevorgänge sind dann sofort möglich.\n\nFür die Musterwerke-Ladekarte fällt eine einmalige Ausgabegebühr an.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Ladekarte bestellen ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-28T14:13:15.000Z"
        },
        {
          "name": "Ladekosten",
          "intent": "chargingCosts",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was kostet die Aufladung meines Elektrofahrzeugs?",
            "Aktuelle Preise für 1 kWh Ladestrom.",
            "Was sind gerade die Preise an der Ladetankstelle?"
          ],
          "description": "Der Kunde möchte wissen, welche Kosten für die Aufladung eines Elektrofahrzeugs anfallen.",
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:06.000Z"
        },
        {
          "name": "Ladekostenabrechnung",
          "intent": "chargingBilling",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "An wen kann ich mich wenden, wenn ich fragen zu meiner Ladestromrechnung habe?",
            "Ich habe letzte Woche an ihrer Ladesäule getankt, aber keine Rechnung erhalten.",
            "Wo bekomme ich die Rechnung für meine Aufladung?"
          ],
          "description": "Der Kunde hat eine Frage zur Abrechnung sowie Rechnungsdokumenten im Rahmen der Aufladung eines Elektrofahrzeugs.",
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:06.000Z"
        },
        {
          "name": "Ladekostenbezahlung",
          "intent": "chargingPayment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist Kartenzahlung an ihren Ladepunkten möglich?",
            "Was gibt es für Bezahloptionen an ihren Ladestationen?",
            "Nimmt die Ladesäule Bargeld?"
          ],
          "description": "Der Kunde möchte wissen, auf welche Weise er den Ladestrom (z. B. an der Ladesäule) bezahlen kann.",
          "newIntent": true,
          "creationTimestamp": "2022-05-11T08:05:33.000Z"
        },
        {
          "name": "Lademodi",
          "intent": "chargingModes",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich zwischen den Lademodi wechseln?",
            "Wie kann ich den Lademodus auswählen ?",
            "Ist jeder Lademodus für jedes Auto geeignet?"
          ],
          "description": "Der Kunde möchte mehr über die verschiedenen Lademodi erfahren.",
          "texts": [
            {
              "text": "Es existieren vier unterschiedliche Lademodi mit Wechselstrom(AC) oder Gleichstrom(DC):\n\n1️⃣ AC-Laden mit festinstalliertem Ladekabel\n2️⃣ AC-Laden mit ICCB oder einer mobiler Ladestation\n3️⃣ AC-Laden an einer Ladesäule oder Wallbox\n4️⃣ DC-Laden ",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:07.000Z"
        },
        {
          "name": "Ladestation pachten",
          "intent": "SM_chargingStation",
          "entity": {
            "entityName": "chargingStationSpecification_L",
            "normalizedEntityValue": "Pacht"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Ladestation pachten.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ladevetrag kündigen",
          "intent": "SM_chargingStation",
          "entity": {
            "entityName": "chargingStationSpecification_L",
            "normalizedEntityValue": "Kündigung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte die Pacht seiner Ladesäule kündigen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ladevorgang",
          "intent": "chargingInstruction",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie lade ich mein Auto auf?",
            "Ich brauche Hilfe beim Aufladevorgang",
            "Gibt es eine Bedienungsanleitung, wie ich die Ladesäule bedienen muss"
          ],
          "description": "Der Kunde hat eine Frage zum Aufladevorgang seines Elektrofahrzeugs.",
          "newIntent": true,
          "creationTimestamp": "2022-04-06T13:53:06.000Z"
        },
        {
          "name": "Parkvorschriften beim Laden",
          "intent": "chargingParkingRegulations",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich einen Strafzettel, wenn ich zu lange an der Ladesäule stehe?",
            "Gibt es eine Blockiergebühr beim Laden?",
            "Wie lange darf ich an der E-Ladesäule parken?"
          ],
          "description": "Der Kunde möchte wissen, welche Parkvorschriften beim Laden an E-Ladesäulen gelten, z. B., ob es eine Blockiergebühr gibt.",
          "texts": [
            {
              "text": "Grundsätzlich gibt es bei uns **keine allgemeine Blockiergebühr**, die bei zu langer Belegung eines Ladeparkplatzes anfällt.\n\nAchte jedoch bitte zusätzlich auf die am Ladeparkplatz **festgelegten Parkvorschriften**.\n\nSolltest du Fragen zum konkreten Ladeplatz und der dortigen Station haben, findest du entsprechende Kontaktdaten des Betreibers direkt auf der Ladesäule.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-08-22T11:17:29.000Z"
        },
        {
          "name": "Pedelec",
          "intent": "SM_pedelec",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann bei Ihnen auch Pedelecs laden?",
            "Ich möchte ein E-Bike ausleihen.",
            "Was ist ein Pedelec?"
          ],
          "description": "Der Kunde möchte mehr über Angebote und Optionen zu Pedelecs und eBikes erfahren.",
          "texts": [
            {
              "text": "Zu den Themengebieten **E-Bike** und **Pedelec** habe ich aktuell leider keine Informationen.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Sondertarife für E-Mobility Kunden",
          "intent": "specialTariffEmobility",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bietet Ihr Sonderkonditionen für ID.3 Fahrer?",
            "Gibt es andere Tarife für einen Fahrer eines ID.3?",
            "Gibt es Sonderangebote für ID.3 Fahrer?"
          ],
          "description": "Sonderkonditionen für E-mobility Kunden",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-22T10:38:29.000Z"
        },
        {
          "name": "THG-Quote",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich meine Emissionseinsparungen im Rahmen des THG-Programms verkaufen?",
            "Was ist die THG-Quote?",
            "Wie kann ich von der Treibhausgas-Quote profitieren?"
          ],
          "description": "Der Kunde hat Fragen zur THG-Quote und damit verbundenen Rahmenbedingungen.",
          "texts": [
            {
              "text": "Um die **Emissionen im Verkehr zu verringern**, sind Unternehmen aus der Mineralölwirtschaft seit 2015 dazu verpflichtet, ihre Emissionsbilanz jedes Jahr um einen gewissen Prozentsatz zu reduzieren. Hierbei gilt es, die sogenannte **Treibhausgasminderungs-Quote (THG-Quote)** zu erfüllen.\n\nKann diese Vorgabe nicht erreicht werden, besteht die Möglichkeit, durch den Kauf von Zertifikaten von emissionssparenden Unternehmen oder Einzelpersonen einen **Ausgleich der Emissionsbilanz** zu erzielen.\n\nAls **Fahrer eines** **Elektroautos** können Sie hiervon **finanziell profitieren**, indem Sie Ihre eingesparten Treibhausgase weiterverkaufen.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Anmeldung",
                  "value": "Wie reiche ich einen Antrag für den Handel mit der THG-Quote ein?",
                  "answer_config": 69132,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Prämie und Auszahlung",
                  "value": "Welche Prämie erwartet mich beim THG-Handel?",
                  "answer_config": 69133,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Statusabfrage",
                  "value": "Wie ist der Status meines THG-Antrags?",
                  "answer_config": 69141,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Voraussetzungen",
                  "value": "Unter welchen Voraussetzungen kann ich meine THG-Quote verkaufen?",
                  "answer_config": 69142,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote Ablehnung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "Ablehnung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zur Ablehnung seines Antrags auf THG-Handel.",
          "texts": [
            {
              "text": "Unter gewissen Umständen kann es vorkommen, dass ein **Antrag auf THG-Handel abgelehnt** werden muss. Hierzu zählen:\n\n-\tEs handelt sich um **kein rein batteriebetriebenes Fahrzeug** (sondern z. B. um ein Hybrid-Fahrzeug)\n-\tEs wurde **kein gültiger Fahrzeugschein** übermittelt (kein Schein eingereicht, Schein nicht lesbar, Schein bereits zuvor eingereicht)\n-\tDie Quote zum Fahrzeug wurde im laufenden Quotenjahr **bereits gehandelt**\n\nIm Falle einer Ablehnung informieren wir Sie umgehend per E-Mail.\n\n💡 Gut zu wissen: Falls der Ablehnungsgrund bei Ihnen eine **bereits gehandelte THG-Quote** für dieses Jahr ist, haben Sie die Chance, nächstes Jahr Ihre THG-Quote erneut zu verkaufen. Wir informieren Sie automatisch zum Jahresende, damit Sie im Folgejahr von Ihrer THG-Quote profitieren können.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Neuen Antrag einreichen ↗",
                  "value": "https://www.elli.eco/de/volkswagen/thg-quote-einloesen",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Status prüfen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote Anmeldung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "Anmeldung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zur Anmeldung für den THG-Quotenhandel.",
          "texts": [
            {
              "text": "Um sich für den **THG-Quotenhandel** über ##utilityName## **anzumelden**, benötigen Sie lediglich Ihren **Fahrzeugschein**. Folgen Sie einfach unserem unten verlinkten Anmeldeprozess.\n\nFalls Sie **mehrere Fahrzeuge** für den THG-Handel anmelden möchten, reichen Sie für jedes Fahrzeug bitte einen eigenen Antrag ein.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt Antrag einreichen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote Auszahlung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "Auszahlung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zur Vergütungsform der THG-Quote.",
          "texts": [
            {
              "text": "Bei Abschluss des Vertrags können Sie auswählen, ob Sie Ihre THG-Quote gegen die **Auszahlung einer Bargeld-Prämie** oder eine **Verrechnung mit Ihrem Stromvertrag** weiterverkaufen möchten. Die aktuelle Höhe der beiden Vergütungsformen finden Sie auf unserer Webseite.\n\nDie Bargeld-Prämie wird ca. **14 Tage nach der Prüfung** Ihrer Fahrzeugdaten durch das Umweltbundesamt ausgezahlt. Haben Sie sich stattdessen für eine Vertragsgutschrift entschieden, wird diese **in der nächsten Jahresrechnung einberechnet**.\n\n💡 **Übrigens**: Sie können Ihre THG-Quote einfach und komfortabel jährlich neu über uns handeln. Hierzu kommen wir automatisch zum Ende des Jahres auf Sie zu.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt Antrag einreichen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Status prüfen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Abwicklung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bAbwicklung"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Abwicklung eines THG-Quotenhandels in der Rolle des Vermittlers.",
          "texts": [
            {
              "text": "Ihre Kunden sind bei uns in guten Händen.\n\nSobald Ihr Kunde sich bei ##utilityName## registriert, **überprüfen wir zu Beginn alle Daten**. Insbesondere der **Fahrzeugschein** wird auf Lesbarkeit überprüft.\n\nIm Anschluss schicken Ihrem Kunden eine **Vertragsbestätigung** zu und starten beim Umweltbundesamt (UBA) den **Prozess zur Bestätigung der THG-Quote**. Sobald das UBA die THG-Quote bestätigt, zahlen wir Ihrem Kunden die vereinbarte **Prämie/Bonus** und Ihnen als Vermittler Ihre **Provision** aus.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Weitere Infos zur Provision",
                  "value": "Weitere Infos zur THG Provision",
                  "answer_config": 69139,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Eigennutzung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bEigennutzung"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Registrierung eigener Fahrzeuge für die THG-Quote.",
          "texts": [
            {
              "text": "Sie können auch Ihre **eigenen Fahrzeuge über Ihr Bestellformular registrieren**. Sie erhalten dann im Erfolgsfall sowohl die Prämie für Ihr Fahrzeug als auch Ihre Provision.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-HTML-Einbindung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bEinbindung"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Einbindung des HTML-Codes für seine Bestellstrecke.",
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Marken",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bMarken"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zum Marken-Branding der Bestellstrecken.",
          "texts": [
            {
              "text": "Beim Registrierungsprozess können Sie die von Ihnen **geführten Marken** angeben. Sie erhalten im Anschluss im Partnerportal das **Material und die Integrationsanleitung für die Bestellstrecken**. Die Einbindung auf Ihrer Website ist sehr einfach und in wenigen Augenblicken abgeschlossen.\n\nDie Bonusstruktur bei **Geldprämien** und beim **Volkswagen Naturstrombonus** ist, sofern verfügbar, **bei allen Marken gleich**.\n\nOb die **Registrierung für verschiedene Marken-Brandings** für Sie sinnvoll ist, hängt von Ihrer Webseite ab.\n\n💡 **Unser Tipp**: Falls Sie pro Automarke ein THG-Bestellformular im passenden Design haben und einbinden möchten, lohnt sich die Registrierung für mehrere Marken. Ansonsten empfehlen wir eine Registrierung für die Marke, die Sie primär vertreiben.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt registrieren ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Webseiten-Einbindung",
                  "value": "THG Webseiten-Einbindung",
                  "answer_config": 69140,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Partnerportal",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bPartnerportal"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zum Partnerportal.",
          "texts": [
            {
              "text": "Im **##utilityName## Partnerportal** finden Sie allgemeine Informationen, relevante Unterlagen sowie hilfreiche Materialien zur Vermarktung der THG-Quote.\r \rNachdem Sie sich als Prämienpartner registriert haben, können Sie sich im Partnerportal **mithilfe eines Einmalpassworts anmelden**. Dieses ist zeitlich begrenzt gültig. Geben Sie zum Erhalt Ihres Passworts auf der Login-Seite einfach eine der folgenden Informationen ein, die Sie in Ihrer Vertragsbestätigung finden: \n\n- Kundennummer\n- Vertragsnummer\n- E-Mail-Adresse\n\nBitte beachten Sie, dass alle Registrierungen von ##utilityName## geprüft und freigegeben werden. Es kann also zu einem **zeitlichen Verzug** kommen, bis die **Erstanmeldung** möglich ist.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Partnerportal ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Partnerregistrierung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bAnmeldung"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Registrierung als THG-Prämienpartner.",
          "texts": [
            {
              "text": "Sie möchten Ihr Unternehmen als **Prämienpartner** registrieren?\n\nAls unser Partner können Sie **an der THG-Quote Ihrer Kunden einfach mitverdienen**. Wenn ein Kunde die THG-Prämie über Ihre Webseite beantragt, erhalten Sie nach erfolgreicher Prüfung eine **Provision**.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt registrieren ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2b-Provision",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bProvision"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Provision, die er bei der THG-Quote als Prämienpartner erhält.",
          "texts": [
            {
              "text": "Die aktuelle Höhe der **Provisionszahlung** finden Sie auf unserer Webseite. Die Provision wird **einmal im Quartal** auf das von Ihnen angegebene Konto überwiesen.\n\nIn unserem **Partnerportal** können Sie unterdessen **vergangene und vorgemerkte Auszahlungen** einsehen.\n\nBitte beachten Sie, dass Auszahlungen aktuell erst als vorgemerkt angezeigt werden, bis das Umweltbundesamt (UBA) die THG-Quote für das entsprechende Fahrzeug bestätigt hat. Aktuell beträgt die **Bearbeitungszeit ca. 12 Wochen**. Sobald wir die Bestätigung vom UBA erhalten haben, zahlen wir unmittelbar danach die Prämie an den bzw. die Fahrzeughalter:in aus.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Provision bei eigenen Fahrzeugen",
                  "value": "Eigene Fahrzeuge für die THG-Quote registrieren",
                  "answer_config": 69136,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Partnerportal ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote b2bVermarktung",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "b2bVermarktung"
          },
          "utterances": [
            null
          ],
          "description": "Der b2b-Kunde hat Fragen zur Vermarktung der THG-Quote über seine Webseite.",
          "texts": [
            {
              "text": "Wir unterstützen Sie tatkräftig bei der bestmöglichen **Vermarktung der THG-Quote über Ihre Webseite**. Unter anderem stellen wir Ihnen markenspezifisch gestaltete Bestellstrecken zur Verfügung, die Sie in kürzester Zeit einfach einbinden können.\n\nDetaillierte Informationen finden Sie hier. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Marken-Brandings",
                  "value": "THG Marken-Brandings",
                  "answer_config": 69137,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Webseiten-Einbindung",
                  "value": "THG Webseiten-Einbindung",
                  "answer_config": 69140,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote Status",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "Status"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zum Status seines Antrags auf THG-Handel.",
          "texts": [
            {
              "text": "Sie können den aktuellen **Status Ihres Antrags** im THG-Kundenportal einsehen.\n\nSollte es zu Schwierigkeiten kommen, informieren wir Sie umgehend via E-Mail.\n\nSobald die **Prüfung Ihrer Fahrzeugdaten** durch das Umweltbundesamt erfolgt ist, erhalten Sie eine finale Bestätigung zu Ihrer THG-Quote und wir informieren Sie ebenfalls per E-Mail. Der Prozess dauert aktuell **ca. 12 Wochen**.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Status prüfen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "THG-Antrag abgelehnt?",
                  "value": "Warum wurde mein THG-Antrag abgelehnt?",
                  "answer_config": 69131,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "THG-Quote Voraussetzungen",
          "intent": "ghgQuota",
          "entity": {
            "entityName": "ghgSpecification_L",
            "normalizedEntityValue": "Voraussetzungen"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Fragen zu den Voraussetzungen für den THG-Handel.",
          "texts": [
            {
              "text": "Jeder **Halter eines Fahrzeuges mit reinem Batteriebetrieb** kann seine THG-Quote weiterverkaufen. Sofern Sie einen **Geschäfts- oder Leasingwagen** fahren, ist auch hier Ihre Eintragung als Halter im Fahrzeugschein ausschlaggebend für die Berechtigung zum Quotenhandel.\n\nAuch wenn Sie Ihr Fahrzeug erst in diesem Jahr gekauft haben oder planen, es zu verkaufen, können Sie Ihre **THG-Quote bis zum Verkaufszeitpunkt handeln**.\n\n💡 **Gut zu wissen**: Wie viel und an welchem Ort das Fahrzeug geladen wird, ist für die THG-Quote nicht relevant.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt Antrag einreichen ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-04-26T07:36:45.000Z"
        },
        {
          "name": "Wallbox(-installation)",
          "intent": "SM_wallbox",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was kostet eine Wallbox?",
            "Ladestation für den privaten Gebrauch kaufen",
            "Wo erhalte ich meine Wallbox?"
          ],
          "description": "Der Kunde sucht Informationen zum Themengebiet (Installation einer) Wallbox.",
          "texts": [
            {
              "text": "Informationen zum Thema **Wallbox** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Wallbox ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Produkte und Leistungen",
      "Intents": [
        {
          "name": "(Fern-)Wärme",
          "intent": "SA_districtHeat",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich suche Informationen zu Fernwärme.",
            "Wie sicher ist Fernwärme?",
            "Wie wird Fernwärme geliefert?"
          ],
          "description": "Der Kunde möchte Informationen zum Thema (Fern-)Wärme",
          "texts": [
            {
              "text": "Zum Themengebiet Fernwärme habe ich aktuell leider keine Informationen. 😕",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "App",
          "intent": "appDownload",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "App Downloaden.",
            "Habt ihr eine App für den Naturstromtarif?",
            "Wie kann ich eure App herunterladen."
          ],
          "description": "Der Kunde hat Fragen zu einer möglichen Smartphone- oder Tablet-App.",
          "texts": [
            {
              "text": "Zum Themengebiet App herunterladen habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-11T12:30:41.000Z"
        },
        {
          "name": "Babybonus",
          "intent": "SA_bonusProgram",
          "entity": {
            "entityName": "bonusType_L",
            "normalizedEntityValue": "Babybonus"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Infos zu bestehendem Babybonus",
          "newIntent": true,
          "creationTimestamp": "2023-04-25T14:32:21.000Z"
        },
        {
          "name": "Baustrom",
          "intent": "SM_powerConsumedOnSite",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibt es bei euch günstigen Baustrom?",
            "Wo muss ich meinen Antrag auf Baustrom stellen?",
            "Woher kann ich Baustrom beziehen?"
          ],
          "description": "Der Kunde möchte Informationen zu Baustrom",
          "texts": [
            {
              "text": "Du benötigst **Baustrom**? Hier findest du alle Informationen 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Baustrom ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Beleuchtungspaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "energyBundle_L",
            "normalizedEntityValue": "Beleuchtungspaket"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zu einem Beleuchtungspaket.",
          "newIntent": false,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "Bestandskundenbonus",
          "intent": "SA_bonusProgram",
          "entity": {
            "entityName": "bonusType_L",
            "normalizedEntityValue": "Bestandskundenbonus"
          },
          "utterances": [
            "Wie erhalte ich den Treuebonus?"
          ],
          "description": "Der Kunde möchte Informationen über einen potenziellen Bestandskundenbonus.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Bonus",
          "intent": "SA_bonusProgram",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich einen Bonus?",
            "Ich suche Informationen zum Bonusprogramm"
          ],
          "description": "Der Kunde möchte Infos zu einem bestehendem Bonusprogramm.",
          "texts": [
            {
              "text": "Mit den **Bonustarifen** der ##utilityName## kannst du **bares Geld sparen** 💰.\n\nAlle Informationen zu unseren Bonusprogrammen findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Bonusprogramm ↗",
                  "value": "https://stadtwerk.bot",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Direktvermarktung",
          "intent": "SA_directMarketing",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich will meinen Solarstrom verkaufen.",
            "Informationen zur Direktvermarktung von Strom.",
            "Ich möchte meinen Strom direkt vermarkten."
          ],
          "description": "Der Kunde sucht Informationen zur Direktvermarktung von Solarenergie.",
          "texts": [
            {
              "text": "Zum Themengebiet Direktvermarktung habe ich aktuell keine Informationen 😕. ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Energie für Kommunen und Einrichtungen",
          "intent": "SA_publicSectorCustomers",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Angebote für kirchliche Einrichtungen.",
            "Habt ihr Angebote für kirchliche Einrichtungen?",
            "Wir benötigen Gasvertrag für unsere Kommune."
          ],
          "description": "Der Kunde möchte Informationen zu Strom & Gas für Kommunen",
          "texts": [
            {
              "text": "Zum Themengebiet Strom und Gas für Kommunen habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Energieberatung",
          "intent": "SM_energyConsulting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Übersicht der Energiedienstleistungen.",
            "Wer ist der Ansprechpartner für die Energieberatung."
          ],
          "description": "Der Kunde möchte Informationen zur Energieberatung",
          "texts": [
            {
              "text": "Zum Themengebiet Energieberatung habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Energiegutschein",
          "intent": "SM_energyGiftCard",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie bekomme ich den Energiegutschein?",
            "Habt ihr einen Geschenkgutschein?",
            "Wo finde ich den Energiegutschein?"
          ],
          "description": "Der Kunde hat eine Anfrage zu einem Energiegutschein",
          "texts": [
            {
              "text": "Zum Themengebiet Energiegutschein habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Energiepaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Welche Energiepakete bieten Sie an?"
          ],
          "description": "Der Kunde sucht Informationen zu einem Energiepaket, z. B. zu einem Wärme- oder Kältepaket.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "Energiespeicher",
          "intent": "energyStorage",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wofür brauche ich einen Batteriespeicher?",
            "Von welchem Hersteller bekomme ich einen Energiespeicher?",
            "Wie lange dauert es, bis mein Energiespeicher nach Bestellung installiert wird?"
          ],
          "description": "Der Kunde sucht Informationen zu Energiespeichern (bzw. Strom-/Batterie-/Solarspeichern).",
          "texts": [
            {
              "text": "Ein **Stromspeicher** lohnt sich vor allem für Besitzer von größeren Solaranlagen. Mit diesem ist es möglich, den während der Sonnenstunden produzierten Strom zu konservieren und nachts oder bei bewölktem Himmel anzufordern.\n\nSolltest du über eine Mini-Photovoltaikanlage verfügen, ist es aufgrund des wesentlich geringeren Ertrags in der Regel nicht sinnvoll, sich einen Stromspeicher anzuschaffen.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-05-30T13:40:43.000Z"
        },
        {
          "name": "Energiezertifikat",
          "intent": "SM_energyCertificate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Woher weiß ich, wieviel Energie mein Wohngebäude verbraucht?",
            "Ich brauche den Verbrauchsausweis für Häuser",
            "Wie stelle ich ein Antrag für den Energieausweis für mein Haus?"
          ],
          "description": "Der Kunde möchte Informationen zu  Energiezertifikaten",
          "texts": [
            {
              "text": "Du benötigst einen Gebäudeenergieausweis? \n\nHier findest du die passenden Informationen 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Gebäudeenergieausweis anfordern ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ermäßigungstarife",
          "intent": "reductionTariffs",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Haben Sie auch Tarife für Schüler und Studenten?",
            "Ich bin Azubi und suche nach einem bezahlbaren Stromanbieter",
            "Bieten Sie auch Seniorentarife an?"
          ],
          "description": "Der Kunde hat eine Frage zu ermäßigten Tarifen für Azubis, Studierende, Senioren, Menschen mit Beeinträchtigungen etc.",
          "texts": [
            {
              "text": "Für **Azubis und Studierende** bieten wir unseren besonders günstigen **Musterwerke-Starter-Strom** an, um im energiegeladenen Studium oder der Ausbildungszeit zu unterstützen.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt abschließen ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-06T14:40:14.000Z"
        },
        {
          "name": "EVU-Vertriebsanfragen",
          "intent": "energyProductContract",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte einen Energievertrag abschließen oder sonstige Leistungen beziehen, die im Aufgabenbereich eines Energieversorgers liegen.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss",
          "intent": "SM_houseConnection",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Mehrspartenanschluss wegen Hausbau.",
            "Mehrspartenanschluss wegen Hausbau benötigt"
          ],
          "description": "Der Kunde möchte Informationen zu Hausanschlüssen",
          "texts": [
            {
              "text": "Alle Informationen zum Thema **Hausanschluss** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Hausanschluss ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsleistungen Mietkosten",
          "intent": "SM_heatContracting",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Kosten"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zu den Mietpreis der Heizungen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsleistungen Modernisierung und Installation",
          "intent": "SM_heatContracting",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Installation"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zur Installation von Mietheizungen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsleistungen und Wärmevereinbarung",
          "intent": "SM_heatContracting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Mich interessieren Wärme Contracting Kosten und Aufwand.",
            "Was ist Contracting? ",
            "Suche Ansprechpartner für Contracting."
          ],
          "description": "Der Kunde sucht Informationen zur Wärmevereinbarung (z. B. bzgl. Heizungsmiete).",
          "texts": [
            {
              "text": "Zum Themengebiet Wärmevereinbarung habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsleistungen Versicherung",
          "intent": "SM_heatContracting",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Versicherung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zur Versicherung seiner Mietheizungen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsleistungen Wartung",
          "intent": "SM_heatContracting",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Wartung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zur Wartung seiner Mietheizungen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Historische Preisentwicklung",
          "intent": "pricesInfo",
          "entity": {
            "entityName": "temporalSpecification_L",
            "normalizedEntityValue": "Vergangenheit"
          },
          "utterances": [
            null
          ],
          "description": "Der Nutzer möchte Informationen über die historische Preisentwicklung.",
          "newIntent": false,
          "creationTimestamp": "2022-06-21T08:49:04.000Z"
        },
        {
          "name": "Informationen für Geschäftskunden",
          "intent": "SA_businessCustomers",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Angebote für Geschäftskunden.",
            "Gewerbestrom für meine Firma.",
            "Angebote für Gewerbekunden."
          ],
          "description": "Der Kunde möchte spezielle Informationen zu Tarifen für Geschäftskunden.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Internet- und Breitbandangebote",
          "intent": "SA_calculatorRedirect",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Telko"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu Internet- und Breitbandangeboten.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kältepaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "energyBundle_L",
            "normalizedEntityValue": "Kältepaket"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zu einem Kältepaket",
          "newIntent": false,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "KFZ-Schein",
          "intent": "vehicleRegistrationCertificate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich den KFZ-Schein hochladen?",
            "Wozu benötigt Ihr meinen KFZ-Schein?",
            "Muss ich den Fahrzeugschein über das Kundenportal hochladen?"
          ],
          "description": "Der Kunde fragt, wo er den KFZ-Schein hochladen soll",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-03T08:28:28.000Z"
        },
        {
          "name": "Klimaneutrales Gas",
          "intent": "SA_climateNeutralGas",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist klimaneutrales Gas?",
            "Was bedeuten CO2-Emissionsfreie Gasprodukte?",
            "Ich will mit klimaneutralen Gasprodukten die Umwelt schonen."
          ],
          "description": "Der Kunde möchte Informationen zu klimaneutralem Gas",
          "texts": [
            {
              "text": "Bei der Verbrennung von Erdgas entsteht unvermeidlich Kohlenstoffdioxid (CO2) 🙁 Um **Klimaneutralität** zu erreichen, muss genau diese Menge an CO2-Emissionen an einem anderen Ort wieder eingespart werden.\n\n\nDies erreichen wir durch **Klimaschutzprojekte**, indem zum Beispiel Wälder aufgeforstet 🌳 oder Technologien zur regenerativen Energiegewinnung entwickelt werden 🙂💪 Deswegen spricht man von **klimaneutralem Erdgas**.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kombibonus",
          "intent": "SA_bonusProgram",
          "entity": {
            "entityName": "bonusType_L",
            "normalizedEntityValue": "Kombibonus"
          },
          "utterances": [
            "Kann ich den Kombibonus erhalten?"
          ],
          "description": "Der Kunde möchte Informationen über einen potenziellen Kombibonus.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kunden-werben-Kunden",
          "intent": "SM_customerReferral",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "An Verwandte weiterempfehlen.",
            "Wo finde ich das Kunden werben Kunden Formular.",
            "Wer kann bei Kunden-werben-Kunden mitmachen?"
          ],
          "description": "Der Kunde möchte Informationen zum Kunden-werben-Kunden-Programm",
          "texts": [
            {
              "text": "Jetzt die ##utilityName## weiterempfehlen und attraktive Prämien sichern 💰!\n\nMehr Informationen findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Kunden-werben-Kunden ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kundenkarte",
          "intent": "SM_loyaltyCard",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kundenkarte der Stadtwerke? ",
            "Wo gibt es Informationen zur Rabattkarte?",
            "Wie bekomme ich eine Kundenkarte?"
          ],
          "description": "Der Kunde möchte Informationen zur Kundenkarte",
          "texts": [
            {
              "text": "Zum Themengebiet Kundenkarte habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ladepaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "energyBundle_L",
            "normalizedEntityValue": "Ladepaket"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde sucht Informationen zu einem Ladepaket.",
          "newIntent": false,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "LED Beleuchtung",
          "intent": "SM_lightingRental",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich bei euch LED-Beleuchtung ausleihen?",
            "Informationen zur LED-Beleuchtung.",
            "Kann ich LED-Beleuchtung bei euch ausleihen?"
          ],
          "description": "Der Kunde möchte Informationen zu LED- Beleuchtung",
          "texts": [
            {
              "text": "Zum Themengebiet LED-Beleuchtung habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ökoenergieprodukte",
          "intent": "SM_ecologicalProducts",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Informationen zu regenerativen Energien."
          ],
          "description": "Der Kunde möchte wissen, ob der Energieversorger Ökostrom- oder Ökogasprodukte anbietet.",
          "texts": [
            {
              "text": "Zum Themengebiet ökologische Produkte habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ökogasprodukte",
          "intent": "SM_ecologicalProducts",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Gas"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, ob der Energieversorger Ökogasprodukte anbietet.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ökostromprodukte",
          "intent": "SM_ecologicalProducts",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Strom"
          },
          "utterances": [
            "Gibt es einen Ökostromtarif?",
            "Was ist Ökostrom."
          ],
          "description": "Der Kunde möchte wissen, ob der Energieversorger Ökostromprodukte anbietet.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Preisauskunft",
          "intent": "pricesInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Preis pro KWh",
            "Arbeitspreis pro Kilowatt?",
            "Mein aktueller Arbeitspreis"
          ],
          "description": "Der Nutzer möchte wissen, welche Kosten und Preise im Rahmen eines bisherigen oder zukünftigen Tarifs auf ihn zukommen.",
          "texts": [
            {
              "text": "Sofern du **bereits ##customer## bei uns** bist, findest du deinen derzeitigen Grund- und Arbeitspreis in deinen Abrechnungen und Vertragsunterlagen im Kundenportal.\n\nAls **Neukunde** erfährst du aktuelle Preise im Zuge unserer Tarifberechnung oder über unsere Tarifübersicht.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Tarif berechnen",
                  "value": "Tarif berechnen",
                  "answer_config": 69264,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 3,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://www.stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Zur Tarifübersicht",
                  "value": "Zur Tarifübersicht",
                  "answer_config": 69371,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-06-21T08:49:04.000Z"
        },
        {
          "name": "Preisentwicklung",
          "intent": "pricesInfo",
          "entity": {
            "entityName": "temporalSpecification_L",
            "normalizedEntityValue": "Zukunft"
          },
          "utterances": [
            null
          ],
          "description": "Der Nutzer möchte Informationen über zukünftige Preisentwicklungen.",
          "newIntent": false,
          "creationTimestamp": "2022-06-21T08:49:04.000Z"
        },
        {
          "name": "Preisgarantie",
          "intent": "SA_priceGuarantee",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie lange geht die Preisgarantie?",
            "Welche Umlagen sind von einer Preisgarantie ausgenommen?",
            "Wie lange gilt die Preisgarantie, wenn ich jetzt einen Vertrag abschließe?"
          ],
          "description": "Der Kunde will wissen, ob es eine Preisgarantie gibt",
          "texts": [
            {
              "text": "Die **Preisgarantie** hängt davon ab, welchen Tarif du hast:\n- **Tarif A:** eine einjährige Preisgarantie\n- **Tarif B:** keine Preisgarantie jedoch flexibel mit einer Frist von einem Monat kündbar. \n\nMehr Informationen dazu findest du hier 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Tarife und Preise ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "PV-Anlage anmelden",
          "intent": "SM_photovoltaicRegister",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe eine Photovoltaikanlage, wie kann ich diese anmelden?"
          ],
          "description": "Der Kunde möchte seine PV-Anlage registrieren",
          "texts": [
            {
              "text": "Tut mir leid, dazu kann ich dir keine Auskunft geben 🙁. Bitte wende dich dazu an deinen Netzbetreiber. Wer das ist, siehst du auf deiner Rechnung.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Sanierungsfahrplan",
          "intent": "SM_renovation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich den Sanierungsfahrplan bestellen?",
            "Was kostet die Erstellung eines Sanierungsfahrplans?",
            "Bietet ihr einen Sanierungsfahrplan an?"
          ],
          "description": "Der Kunde möchte Informationen zum Sanierungsfahrplan",
          "texts": [
            {
              "text": "Zum Themengebiet Sanierungsfahrplan habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Solarpaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "energyBundle_L",
            "normalizedEntityValue": "Solarpaket"
          },
          "utterances": [
            "Ich habe Interesse am Solar Paket"
          ],
          "description": "Der Kunde sucht Informationen zu einem Solarpaket.",
          "newIntent": false,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "Solarprodukte",
          "intent": "SM_solarProducts",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Für wen eignet sich die Eigenstromerzeugung?",
            "Ich interessiere mich für eine Photovoltaikanlage.",
            "PV Anlage von den Stadtwerken mieten"
          ],
          "description": "Der Kunde sucht allgemeine Informationen zu Solarprodukten.",
          "texts": [
            {
              "text": "Alle Informationen rund um unsere **Solarprodukte** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Unsere Solarprodukte ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Standrohr",
          "intent": "SM_standPipe",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Verleiht ihr Standrohre?",
            "Wir wollen ein Standrohr reservieren.",
            "Informationen der Standrohr-Ausleihe."
          ],
          "description": "Der Kunde möchte ein Standrohr mieten",
          "texts": [
            {
              "text": "Zum Themengebiet Standrohr habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Strom & Gas für Industrie-/ Individualkunden",
          "intent": "SA_industrialCustomers",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte Strom für meinen industriellen Betrieb",
            "Ich möchte Strom für meinen Industriebetrieb.",
            "Energie für Großabnehmer."
          ],
          "description": "Der Kunde möchte eine Tarifübersicht für Industriekunden.",
          "texts": [
            {
              "text": "Zum Themengebiet Industriekunden habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Tarifberechnung (Vertrieb)",
          "intent": "SA_calculatorRedirect",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich Gasangebote einholen?",
            "Ich möchte einen Vertrag abschließen.",
            "Ich würde gerne von Ihnen mit Strom beliefert werden."
          ],
          "description": "Der Kunde möchte seinen Tarif berechnen.",
          "texts": [
            {
              "text": "Leider bieten wir zu dieser Produktart keine Verträge an. Gerne kannst du aber einen Vertrag in folgenden Sparten abschließen 👇",
              "buttons": null
            },
            {
              "text": "Sehr gerne!🤗 Dein neuer Energievertrag ist innerhalb von 3 Minuten bestellt.",
              "buttons": null
            },
            {
              "text": "Du möchtest **mehrere Verträge** abschließen? Kein Problem! Du kannst hier gerne hintereinander Verträge verschiedener **angebotener** Sparten abschließen.",
              "buttons": null
            },
            {
              "text": "Eine Übersicht zu unseren **Wärmeprodukten** findest du hier 👇",
              "buttons": null
            },
            {
              "text": "Zur Tarifauswahl",
              "buttons": null
            },
            {
              "text": "Vielen Dank! Verwende den folgenden Link, um zu deinem persönlichen Angebot zu gelangen 👇\n",
              "buttons": null
            },
            {
              "text": "Zum Schluss brauche ich noch deinen **jährlichen Energieverbrauch in kWh**:",
              "buttons": null
            },
            {
              "text": " Ich helfe dir gerne dabei 🤗 Mit unserem Tarifrechner kannst du alle unsere Angebote vergleichen.\r \r Bitte gib nun deine **Postleitzahl** ein:",
              "buttons": null
            },
            {
              "text": "Bitte wähle die gewünschte **Energieart** aus:",
              "buttons": null
            },
            {
              "text": "Eine Übersicht und Informationen zu unseren **Wassertarifen** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Wasser ↗",
                  "value": "https://stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": "entityWasser"
                }
              ]
            },
            {
              "text": "Weiteren Tarif abschließen",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Tarife und Produkte",
          "intent": "SM_tariffsAndPricesInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Produktübersicht anzeigen.",
            "Welche Gastarife gibt es?",
            "Welche Produkte bieten sie an?"
          ],
          "description": "Der Kunde möchte Informationen zu Produkten und Tarifen.",
          "texts": [
            {
              "text": "Sehr gerne! In drei Minuten ist deine Anmeldung bei uns erledigt.\n\nBei uns gibt’s **ausschließlich Ökostrom** und **klimaneutrales Gas** 🌳. Wir finden, es gibt Wichtigeres im Leben als Strom. Darum liefern wir dir Ökostrom, über den du nicht lange nachdenken musst 😎",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Jetzt anmelden ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Tarife und Produkte Wärme",
          "intent": "SM_tariffsAndPricesInfo",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Wärme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu Wärmeprodukten und -tarifen.",
          "texts": [
            {
              "text": "Wir können mehr als nur Strom und Gas! Einen Überblick über unsere Wärmeangebote findest du unter dem folgenden Link:",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Wärmeangebote ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Thermographie",
          "intent": "SM_thermography",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie läuft der Thermografie-Check ab?",
            "Was ist Thermographie?",
            "Führt ihr Gebäude-Thermographie-Analysen durch?"
          ],
          "description": "Der Kunde möchte Informationen zur Thermografie",
          "texts": [
            {
              "text": "Mit dem Thermografie-Check jetzt Licht ins Dunkel bringen 💡 und profitieren!",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Thermographie-Check ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht Dienstleistungen",
          "intent": "SA_serviceOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kannst du mir eine Übersicht eurer Services anzeigen?",
            "Welche Dienstleistungen bietet ihr an?",
            "Was habt ihr für Serviceangebote?"
          ],
          "description": "Der Kunde möchte eine Übersicht über angebotene Dienstleistungen",
          "texts": [
            {
              "text": "Eine Übersicht über unsere Dienstleistungen findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "E-Mobilität ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Energieberatung ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 3,
                  "title": "Internet und Telefon ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 4,
                  "title": "Wärmecontracting ↗",
                  "value": "https://www.stadtwerk.bot/portal",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zu Vertriebsthemen",
          "intent": "salesOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Produktinformationen",
            "Vertriebsübersicht",
            "Vertrieb"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen rund um Vertriebsangelegenheiten.",
          "texts": [
            {
              "text": "Du interessierst dich für unsere **Tarife und Produkte**?\n\nUnten findest du passende Themen, die du einfach auswählen kannst. Alternativ kannst du auch eine eigene Frage im Chat eingeben.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Preisauskunft",
                  "value": "Preisauskunft",
                  "answer_config": 69251,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Tarif berechnen",
                  "value": "Tarif berechnen",
                  "answer_config": 69264,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Tarifübersicht",
                  "value": "Tarifübersicht",
                  "answer_config": 69371,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-08-23T14:03:20.000Z"
        },
        {
          "name": "Versorgungsgebiet",
          "intent": "SA_deliveryArea",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Liefert ihr Energie an meinen Standort?",
            "Suche Informationen, ob ihr mich mit Energie beliefern könnt.",
            "Wo kann ich sehen, ob ihr Strom an mein Zuhause liefert?"
          ],
          "description": "Der Kunde möchte wissen, ob er im Liefergebiet des EVU wohnhaft ist.",
          "texts": [
            {
              "text": "Du möchtest wissen, ob wir dich in deinem Zuhause mit Energie beliefern können?\r \r Dies kannst du ganz einfach prüfen, indem du **deine Postleitzahl** im Tarifrechner eingibst! 🙂",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zum Tarifrechner",
                  "value": "Tarif berechnen",
                  "answer_config": 69264,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Versorgungsgebiet Wärme",
          "intent": "SA_deliveryArea",
          "entity": {
            "entityName": "ProductType_L",
            "normalizedEntityValue": "Wärme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, ob er im Liefergebiet des EVU für Wärme wohnhaft ist.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wärmepaket",
          "intent": "energyBundle",
          "entity": {
            "entityName": "energyBundle_L",
            "normalizedEntityValue": "Wärmepaket"
          },
          "utterances": [
            "Was ist das Wärme Paket?"
          ],
          "description": "Der Kunde sucht Informationen zu einem Wärmpaket.",
          "newIntent": false,
          "creationTimestamp": "2022-03-17T13:14:38.000Z"
        },
        {
          "name": "Wärmepumpe",
          "intent": "SM_heatPump",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich bei euch ein Wärmepumpensystem bestellen?",
            "Was bringt mir eine Wärmepumpe?"
          ],
          "description": "Der Kunde möchte Informationen zu einer Wärmepumpe.",
          "texts": [
            {
              "text": "Zum Themengebiet Wärmepumpe habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wärmepumpe Kosten",
          "intent": "SM_heatPump",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Kosten"
          },
          "utterances": [
            "Habt ihr Wärmepumpentarife?"
          ],
          "description": "Der Kunde möchte Informationen zu den Kosten einer Wärmepumpe.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wärmepumpe Wartung",
          "intent": "SM_heatPump",
          "entity": {
            "entityName": "topicSpecification_L",
            "normalizedEntityValue": "Wartung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Wartung einer Wärmepumpe.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wechselbonus",
          "intent": "SA_bonusProgram",
          "entity": {
            "entityName": "bonusType_L",
            "normalizedEntityValue": "Wechselbonus"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über einen potenziellen Wechselbonus.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Konto und Vertragsdaten",
      "Intents": [
        {
          "name": "Anbieterwechsel",
          "intent": "SA_changeSupplier",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte meinen Tarif wechseln.",
            "Ich möchte zu euch wechseln.",
            "Ich möchte von euch weg zu einem anderen Anbieter."
          ],
          "description": "Der Kunde möchte seinen Anbieter wechseln.",
          "texts": [
            {
              "text": "Jeder Verbraucher kann seinen **Energielieferanten frei wählen**. \nDabei müssen lediglich die **Kündigungsfristen** beachtet werden ⏰\n\n\nDamit ich dir helfen kann, muss ich wissen, ob du **bereits unser Kunde** bist \noder **zu uns wechseln** möchtest 👇\n",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Bestandskunde",
                  "value": "Vertrag beenden",
                  "answer_config": 69308,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Neukunde",
                  "value": "Ich möchte Kunde werden",
                  "answer_config": 69264,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kunden- und Vertragsdaten einsehen",
          "intent": "viewCustomerData",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen wo seine Kunden- und Vertragsdaten einsehbar sind.",
          "texts": [
            {
              "text": "Alle Informationen zu deinen Kundendaten und Verträgen findest du online im Kundenportal unter dem Menüpunkt **Meine Kundendaten**.\n\nDort kannst du deine Daten auch bequem und unkompliziert online verwalten.\n\nDeine **Kundennummer/Vertragsnummer** findest du normalerweise auf allen Schreiben von uns rechts oben 📄↖.\n\nSolltest du weitere Fragen haben, nimm bitte gerne Kontakt zu uns auf!",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Kontakt",
                  "value": "Ich bitte um Kontakt",
                  "answer_config": 69304,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-02-10T13:00:47.000Z"
        },
        {
          "name": "Kundendaten ändern",
          "intent": "SM_changeCustomerData",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich will meine Rechnungsadresse anpassen.",
            "Ich will meine Adresse ändern.",
            "Ich will meine Kundendaten ändern."
          ],
          "description": "Der Kunde will seine Benutzerdaten im Kundenportal ändern",
          "texts": [
            {
              "text": "Hier kannst du deine Kundendaten ändern",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kundenportal",
          "intent": "customerPortal",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich einen Link zum Kundenportal haben?",
            "Wo ist euer Online-Service?",
            "Registrierung im Kundenportal",
            "Anmeldung im Kundenportal"
          ],
          "description": "Der Kunde hat Fragen zum Kundenportal und dessen Funktionsumfang oder wünscht eine Anleitung dazu.",
          "texts": [
            {
              "text": "Unser **Kundenportal** bietet dir eine Vielzahl an Funktion. Dort kannst du zum Beispiel: \n\n•  deine Kunden- und Vertragsdaten verwalten\\\n•  deinen Zählerstand melden\\\n•  deine Abschläge ändern\n\nSollte dein Anliegen im Kundenportal nicht abgedeckt sein, nimm gerne Kontakt zu uns auf!",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Kontaktanfrage",
                  "value": "Ich bitte um Kontakt",
                  "answer_config": 69305,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Kundenportal ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kündigungsfrist",
          "intent": "SA_deadlinePeriodEnd",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Die Kündigungsfrist für Stromverträge?",
            "Kündigungsfrist bei Sonderkündigungsrecht?",
            "Die Kündigungsfrist bei Stromverträgen."
          ],
          "description": "Der Kunde möchte Informationen zur Kündigungsfrist",
          "texts": [
            {
              "text": "Deine **Kündigungsfristen** und **Vertragslaufzeiten** variieren je nach Energievertrag. Wir würden uns jedoch sehr freuen, wenn du weiterhin bei uns ##customer## bleibst 🤗🤗🤗\n\nWeitere Informationen zu deinem aktuellen Vertrag findest du im **Online-Kundencenter** 🙂",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Online-Kundencenter ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Tarifübersicht ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kündigungsstatus",
          "intent": "terminationStatus",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, ob seine Kündigung eingegangen ist oder wie der Bearbeitungsstand der Kündigung ist.",
          "texts": [
            {
              "text": "Sofern du eine Frage zum Bearbeitungsstand deiner Kündigung hast, wende dich bitte an unseren Kundenservice.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-09-09T07:05:01.000Z"
        },
        {
          "name": "Lieferbeginn",
          "intent": "startOfSupply",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Dauer Stromanmeldung",
            "Startdatum der Lieferung",
            "Wie lange dauert es bis ich Strom bekomme?"
          ],
          "description": "Der Kunde möchte wissen, ab wann er mit Energie oder sonstigen Energieprodukten beliefert wird.",
          "newIntent": true,
          "creationTimestamp": "2022-06-23T13:54:54.000Z"
        },
        {
          "name": "Login-Probleme",
          "intent": "loginIssues",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Einloggen schlägt fehl",
            "Ich habe Probleme beim Login",
            "Ich kann mich nicht anmelden"
          ],
          "description": "Der Kunde hat Probleme beim Versuch, sich im Kundenportal anzumelden.",
          "texts": [
            {
              "text": "Ich verstehe. Benötigst du Hilfe mit deinen Zugangsdaten oder liegt ein technisches Problem auf unserer Webseite vor?",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Problem mit Zugangsdaten",
                  "value": "Problem mit Zugangsdaten",
                  "answer_config": 69100,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Technisches Problem",
                  "value": "Technisches Problem",
                  "answer_config": 69373,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-07T15:22:32.000Z"
        },
        {
          "name": "Todesfall",
          "intent": "caseOfDeath",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Todesfall melden",
            "Der Vertragsinhaber ist verstorben"
          ],
          "description": "Der Kunde möchte wissen, wie er bei einem Todesfall eines Vertragspartners oder eines sonstigen Beteiligten vorgehen kann",
          "texts": [
            {
              "text": "Unser herzliches Beileid. Wir wünschen dir viel Kraft in dieser schwierigen Zeit. Um dich bei weiteren Schritten zu entlasten, trete bitte mit unserem **Kundenservice** in Kontakt damit alle notwendigen Informationen unkompliziert an uns weitergeben werden können.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kundenservice",
                  "value": "Kundenservice",
                  "answer_config": 69319,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-01-12T14:16:42.000Z"
        },
        {
          "name": "Übersicht zu Vertragsangelegenheiten",
          "intent": "contractOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche Hilfe mit meinem Vertrag",
            "Ich habe eine Frage zum Vertrag",
            "Vertragsfrage"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen rund um Vertragsangelegenheiten.",
          "texts": [
            {
              "text": "Du hast eine **Frage zu deinem Vertrag** oder möchtest **Änderungen daran vornehmen**?\n\nUnten findest du häufige Themen. Natürlich kannst du auch eine eigene Frage im Chat stellen.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Vertrag kündigen",
                  "value": "Vertrag kündigen",
                  "answer_config": 69308,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Vertrag verlängern",
                  "value": "Vertrag verlängern",
                  "answer_config": 69112,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Vertragsbeginn abfragen",
                  "value": "Vertragsbeginn abfragen",
                  "answer_config": 69386,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Vertragslaufzeit und Fristen",
                  "value": "Vertragslaufzeit und Kündigungsfristen",
                  "answer_config": 69271,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-08-23T12:01:20.000Z"
        },
        {
          "name": "Vertrag übertragen",
          "intent": "SA_transferContract",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Lässt sich der Energievertrag auf eine andere Person übertragen?",
            "Ich würde gerne meinen Vertrag übertragen",
            "Ich möchte den Vertrag meines Vormieters übernehmen"
          ],
          "description": "Der Kunde möchte seinen Energievertrag auf eine andere Person übertragen.",
          "texts": [
            {
              "text": "Zum Themengebiet Vertragsübertragung habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragsbestätigung/-status",
          "intent": "SA_contractConfirmation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich meine Auftragsbestätigung per Post?",
            "Wie ist der Vertragsstatus?",
            "Ich habe Probleme mit der Stromanmeldung"
          ],
          "description": "Der Kunde hat Rückfragen zur Vertragsbestätigung ",
          "texts": [
            {
              "text": "Aktuell warten wir auf die Kündigungsbestätigung deines vorherigen Energielieferanten. \nDies ist Grundlage dafür, dass wir dich mit Strom beliefern können 🙂",
              "buttons": null
            },
            {
              "text": "Die **Vertragsbestätigung** erhältst du per E-Mail 💻📩, sobald wir dich erfolgreich angemeldet haben. Das kann manchmal **bis zu drei Wochen** dauern.\n\n\nFalls du Probleme mit der Anmeldung deines Energievertrages hat klicke [**hier**](https://stadtwerk.bot/portal/?hsag_marker=calcRedirect)\n\n\nAllternativ findest du deine Auftrags- und Vertragsbestätigung auch im [**Kundenportal**](https://stadtwerk.bot/portal/?hsag_marker=calcRedirect)\n",
              "buttons": null
            },
            {
              "text": "Die Vertragsbestätigung erhältst du per E-Mail, sobald wir dich erfolgreich angemeldet haben. Das kann manchmal bis zu 3️⃣  Wochen dauern 😉\n\n\nFalls du Probleme mit der Anmeldung Ihres Energievertrages hat klicke [**hier**](https://stadtwerk.bot/portal/?hsag_marker=calcRedirect)\n\n\nAllternativ findest du deine Auftrags- und Vertragsbestätigung auch im [**Kundenportal**](https://stadtwerk.bot/portal/?hsag_marker=calcRedirect)\n",
              "buttons": null
            },
            {
              "text": "Hier kannst du deinen Vertrags- bzw. Wechselstatus prüfen.",
              "buttons": null
            },
            {
              "text": "Bitte gib dein *Geburtsdatum* ein (Für Testzwecke verwende bitte den 10.10.1910 als Geburtsdatum 😉):",
              "buttons": null
            },
            {
              "text": "Du bist zur Zeit aktiv in Belieferung.\n\nDas bedeutet, dass dein Vertrag aktiv ist und du mit Strom versorgt wirst ⚡",
              "buttons": null
            },
            {
              "text": "Dein Vertrag ist aktuell blockiert. Wende dich gerne an den Kundenservice wenn du weitere Auskünfte benötigst.",
              "buttons": null
            },
            {
              "text": "Der Vertrag wurde storniert.\n\nFalls du Rückfragen hast, wende dich bitte an meine ##colleagueplural## aus dem Kundenservice.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "test-button ↗",
                  "value": "https://www.google.de",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Du musst dir keine Sorgen machen, du befindest dich aktuell im Anmeldevorgang bei deinem örtlichen Verteilnetzbetreiber. *Dies kann bis zu 10 Werktage dauern.*\n\nSobald wir die Bestätigung vom Netzbetreiber erhalten, bekommst du von uns deine Vertragsbestätigung 🙂\n\n",
              "buttons": null
            },
            {
              "text": "Dein Vertrag ist abgelaufen.",
              "buttons": null
            },
            {
              "text": "Das Lieferende deines Vertrags wurde bereits erreicht und ist daher abgelaufen. Wir freuen uns, dich in Zukunft als ##customer## begrüßen zu dürfen :)\n",
              "buttons": null
            },
            {
              "text": "Dein Auftrag befindet sich noch in Bearbeitung. Sollten wir weitere Informationen von dir benötigen, kommen wir auf dich zu.",
              "buttons": null
            },
            {
              "text": "Dein Vertrag ist gekündigt. Du befindest sich aktuell noch in Belieferung.",
              "buttons": null
            },
            {
              "text": "Dein Vertrag wurde bestätigt und du kommst in Kürze in Belieferung.",
              "buttons": null
            },
            {
              "text": "Bitte gib deine *Vertragsnummer* ein (Bitte verwende die Testvertragsnr: 6):",
              "buttons": null
            },
            {
              "text": "Der Vertrag ist abgelaufen (Vertrag gekündigt).",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragskonditionen",
          "intent": "SA_contractTerms",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Allgemeine Konditionen eurer Verträge",
            "Vertragsbedingungen anzeigen",
            "Konditionen der Strom- und Gasverträge"
          ],
          "description": "Der Kunde hat Nachfragen bezüglich der Vertragskonditionen.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragskonto",
          "intent": "ID_contractAccount",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Brauche meine Vertragskontonummer.",
            "Vertragskontonummer Erklärung gewünscht.",
            "Was ist die Vertragskontonummer?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, was das Vertragskonto ist",
          "texts": [
            {
              "text": "Unter **Vertragskontonummer** führen wir das **Kundenkonto** mit allen Zahlungsvorgängen. Dies dient zur eindeutigen Zuordnung (z. B. bei der Zahlung).",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragskündigung",
          "intent": "SM_contractTermination",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Abmeldung Stromtarif online oder schriftlich?",
            "Aktuellen Stromvertrag zum Jahresende gemäß den Vertragskonditionen beenden.",
            "Beendigung des Belieferungsvertrages mit euch."
          ],
          "description": "Der Kunde möchte seinen bestehenden Vertrag kündigen",
          "texts": [
            {
              "text": "Wir würden uns freuen, wenn du ##customer## bei uns bleibst 😊\n\nWir kümmern uns gerne persönlich um dein Anliegen. Worum handelt es sich konkret?",
              "buttons": null
            },
            {
              "text": "Das finde ich sehr schade 🙁.\n\nMeine ##colleagueplural## nehmen sich gerne Zeit für dein Anliegen und nehmen Kontakt zu dir auf.",
              "buttons": null
            },
            {
              "text": "Das finde ich sehr schade. 🙁\n\nMeine ##colleagueplural## nehmen sich gerne Zeit für dein Anliegen. Lass dich von unserem Kundenservice beraten - gemeinsam finden wir einen passenden Tarif für dich!",
              "buttons": null
            },
            {
              "text": "Sonstiges",
              "buttons": null
            },
            {
              "text": "Anbieterwechsel",
              "buttons": null
            },
            {
              "text": "Ich ziehe um.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragslaufzeit",
          "intent": "contractDuration",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Läuft mein Vertrag weiter?",
            "Was ist die Mindestvertragslaufzeit bei Stromverträgen?",
            "Wie lang sind Vertragslaufzeiten für den Stromtarif?"
          ],
          "description": "Der Kunde möchte Informationen zur Vertragslaufzeit.",
          "texts": [
            {
              "text": "Die **Laufzeit deines Vertrags** hängt davon ab, welchen Tarif du hast:\n- **Tarif A:** 12 Monate Laufzeit\n- **Tarif B:** 24 Monate Laufzeit. \n\nMehr Informationen dazu findest du hier 👇\n",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Tarife und Preise ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-12T08:51:11.000Z"
        },
        {
          "name": "Vertragsverlängerung",
          "intent": "contractExtension",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wird mein Vertrag automatisch verlängert?",
            "Wird mein Stromvertrag automatisch verlängert?",
            "Bis wann kann ich den Stromvertrag verlängern?"
          ],
          "description": "Der Kunde will seinen Vertrag verlängern",
          "texts": [
            {
              "text": "Du willst deinen **Energievertrag** verlängern?\n\nUnser Kundenservice berät dich hierzu gerne! 🙂",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kundenservice",
                  "value": "Kundenservice",
                  "answer_config": 69319,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-23T09:37:33.000Z"
        },
        {
          "name": "Weiterleitung zur Vertragsbestätigung",
          "intent": "SA_changeSupplier",
          "entity": {
            "entityName": "adverbialMarker_L",
            "normalizedEntityValue": "Temporal"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zur Vertragsbestätigung.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Widerruf",
          "intent": "revocation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte meinen Vertragsabschluss widerrufen",
            "Wo finde ich das Widerrufsformular?"
          ],
          "description": "Der Kunde möchte einen Widerruf einreichen, z. B. zu seinem Vertragsabschluss oder seiner Kündigung.",
          "newIntent": true,
          "creationTimestamp": "2022-03-16T09:50:11.000Z"
        },
        {
          "name": "Widerruf Kündigung",
          "intent": "revocation",
          "entity": {
            "entityName": "termination_L",
            "normalizedEntityValue": "Kündigung"
          },
          "utterances": [
            "Kann ich meine Kündigung widerrufen?"
          ],
          "description": "Der Kunde möchte einen Widerruf speziell zu seiner Kündigung einreichen.",
          "texts": [
            {
              "text": "Schön, dass du weiterhin bei den Stadtwerken ##adressCity## bleiben möchtest. Gerne prüfen wir, ob wir dir die bestehenden Konditionen weiter einräumen können.\n\nVerwende hierfür unsere **Kontaktanfrage**, um mit dem Kundendienst in Kontakt zu treten. 😊",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontaktanfrage",
                  "value": "Kontaktanfrage",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-03-16T09:50:11.000Z"
        },
        {
          "name": "Zugangsdaten anfordern",
          "intent": "changePassword",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Passwort wird nicht akzeptiert.",
            "Ich habe mein Passwort vergessen."
          ],
          "description": "Der Kunde bittet um neue Zugangsdaten (Nutzername oder Passwort) für das Kundenportal.",
          "texts": [
            {
              "text": "Du kannst dich nicht im Kundenportal Online einloggen? Hier kannst du dein Passwort ändern 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Passwort vergessen ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Unternehmen",
      "Intents": [
        {
          "name": "Aktuelle Meldungen",
          "intent": "SM_currentNews",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibst du mir die aktuellen Informationen?",
            "Ich brauche die aktuellen Meldungen.",
            "Wo sind die aktuellen Nachrichten?"
          ],
          "description": "Der Kunde möchte aktuelle Meldungen/Nachrichten erhalten",
          "texts": [
            {
              "text": "Zum Themengebiet aktuelle Meldungen habe ich noch keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Allgemeine Geschäftsbedingungen",
          "intent": "SM_termsAndConditions",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich die AGBs einsehen?",
            "Allgemeine Geschäftsbedingungen anzeigen",
            "Allgemeine Geschäftsbedingungen"
          ],
          "description": "Der Kunde möchte die AGBs anzeigen",
          "texts": [
            {
              "text": "Unsere **Allgemeinen Geschäftsbedingungen** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zu den AGBs ↗",
                  "value": "https://hsag.info/agb/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ausschreibungen",
          "intent": "SM_tenderOffer",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibt es bei ihnen Aufträge?",
            "Gibt es hier eine Angebotsausschreibung?",
            "Haben sie momentan Ausschreibungen zu vergeben?"
          ],
          "description": "Der Kunde möchte Informationen zu aktuellen Ausschreibungen",
          "texts": [
            {
              "text": "Zum Themengebiet Ausschreibungen habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Cloudia Dokumanager",
          "intent": "SM_cloudService",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist der Dokumentenmanager Cloudia?",
            "Welche Vorteile habe ich durch Cloudia?",
            "Was ist Cloudia?"
          ],
          "description": "Der Kunde möchte Informationen zum Dokumentenmanager",
          "texts": [
            {
              "text": "Zum Themengebiet  Dokumentenmanager habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Cyberangriff",
          "intent": "cyberAttack",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zu einem möglichen Cyber- bzw. Hackerangriff.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-22T09:06:08.000Z"
        },
        {
          "name": "Cyberangriff Forderung",
          "intent": "cyberAttack",
          "entity": {
            "entityName": "cyberAttack_L",
            "normalizedEntityValue": "Forderung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zu den Forderungen nach einem Cyber- bzw. Hackerangriff.",
          "newIntent": false,
          "creationTimestamp": "2022-07-22T09:06:08.000Z"
        },
        {
          "name": "Cyberangriff Handlungsempfehlung",
          "intent": "cyberAttack",
          "entity": {
            "entityName": "cyberAttack_L",
            "normalizedEntityValue": "Handlungsempfehlung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zu den Handlungsempfehlungen nach einem Cyber- bzw. Hackerangriff.",
          "newIntent": false,
          "creationTimestamp": "2022-07-22T09:06:08.000Z"
        },
        {
          "name": "Cyberangriff Leak",
          "intent": "cyberAttack",
          "entity": {
            "entityName": "cyberAttack_L",
            "normalizedEntityValue": "Leak"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, welche Informationen durch einen Cyber- bzw. Hackerangriff geleakt wurden.",
          "newIntent": false,
          "creationTimestamp": "2022-07-22T09:06:08.000Z"
        },
        {
          "name": "Cyberangriff Verantwortliche",
          "intent": "cyberAttack",
          "entity": {
            "entityName": "cyberAttack_L",
            "normalizedEntityValue": "Verantwortliche"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat eine Frage zu den Verantwortlichen im Falle eines Cyber- bzw. Hackerangriffs.",
          "newIntent": false,
          "creationTimestamp": "2022-07-22T09:06:08.000Z"
        },
        {
          "name": "Daten und Fakten über das EVU/Stadtwerk",
          "intent": "factsAndFigures",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Kunde fragt nach Zahlen und Fakten bzw. Informationen aus dem Geschäftsbericht",
          "texts": [
            {
              "text": "Zum Themengebiet Zahlen, Daten und Fakten habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-25T14:20:51.000Z"
        },
        {
          "name": "Datenschutz und Datensicherheit",
          "intent": "SM_dataPrivacy",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Schutz meiner personenbezogenen Daten",
            "Speicherst du meine Daten?",
            "Sind meine Daten sicher?"
          ],
          "description": "Der Kunde möchte eine Auskunft zum Schutz und Umgang mit seinen Daten.",
          "texts": [
            {
              "text": "Informationen zum **Datenschutz** kannst du hier nachlesen 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Datenschutzbestimmungen ↗",
                  "value": "https://hsag.info/datenschutz/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Gewinnspiel",
          "intent": "SM_prizeCompetition",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo finde ich Informationen zu den Gewinnspielen?",
            "Wo kann ich am Gewinnspiel teilnehmen?",
            "Kann ich bei euch was gewinnen?"
          ],
          "description": "Der Kunde möchte am Gewinnspiel teilnehmen",
          "texts": [
            {
              "text": "Zum Themengebiet Gewinnspiel habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Impressum",
          "intent": "SM_imprint",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Impressum aufrufen",
            "Wo finde ich das Impressum?",
            "Haben Sie ein Impressum?"
          ],
          "description": "Der Kunde möchte das Impressum sehen",
          "texts": [
            {
              "text": "Unser **Impressum** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Impressum ↗",
                  "value": "https://hsag.info/impressum/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Karriere",
          "intent": "SM_career",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte ein Praktikum machen.",
            "Ich habe Interesse an einem Job.",
            "Wo kann ich mich bei Ihnen bewerben?"
          ],
          "description": "Der Kunde will Informationen zu Karrieremöglichkeiten bei den Stadtwerken/dem EVU",
          "texts": [
            {
              "text": "Du willst die Energiewelt von morgen mitgestalten? Dann komm zu uns! 🏃‍♂️\\\nEinen Überblick über unsere **freien Stellen** und alle Informationen rund um **deine Karriere** mit uns findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Karriere ↗",
                  "value": "https://www.linkedin.com/company/hsag-heidelberger-services-ag/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Nachhaltigkeit",
          "intent": "SM_sustainability",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie ernst nehmt ihr Nachhaltigkeit?",
            "Arbeitet ihr nachhaltig?",
            "Wie nachhaltig ist euer Strom?"
          ],
          "description": "Der Kunde möchte Infos zum Thema Nachhaltigkeit",
          "texts": [
            {
              "text": "Zum Themengebiet Nachhaltigkeit habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Schulkommunikation",
          "intent": "SM_schoolCommunication",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte mich über die Energievorträge der Stadtwerke informieren.",
            "Schulkommunikation der Stadtwerke",
            "Zeige mir die Website der Schulkommunikation"
          ],
          "description": "Der Kunde möchte sich über die Schulkommunikation erkundigen",
          "texts": [
            {
              "text": "Zum Themengebiet Schulkommunikation habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Social Media",
          "intent": "socialMedia",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Seid ihr auch bei Facebook?",
            "Haben Sie auch einen YouTube-Kanal?",
            "Finde ich euch auf Instagram?"
          ],
          "description": "Der Kunde möchte erfahren, ob das Unternehmen auch in sozialen Netzwerken aktiv ist.",
          "texts": [
            {
              "text": "Die ##utilityName## findest du auch in den **sozialen Netzwerken**. Folge einfach unseren Kanälen und bleibe immer auf dem Laufenden! 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Facebook ↗",
                  "value": "https://de-de.facebook.com/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Instagram ↗",
                  "value": "https://www.instagram.com/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 3,
                  "title": "YouTube ↗",
                  "value": "https://www.youtube.com/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-10T14:14:22.000Z"
        },
        {
          "name": "Soziales Engagement",
          "intent": "SM_socialCommitment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich bei den Möglichmachern mitmachen?",
            "Welche sozialen Aktivitäten unterstützt ihr?",
            "Ich brauche Informationen zu den Möglichmachern."
          ],
          "description": "Der Kunde möchte Informationen zum sozialem Engagement des Energieversorgers",
          "texts": [
            {
              "text": "Zum Themengebiet Soziales Engagement habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Sponsoring",
          "intent": "SM_sponsoring",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Informationen zu eurem Sponsoring.",
            "Ich möchte einen Förderantrag stellen.",
            "Seid ihr Sponsoren?"
          ],
          "description": "Der Kunde hat eine Anfrage zum Sponsoring ",
          "texts": [
            {
              "text": "Zum Themengebiet Sponsoring habe ich aktuell keine Informationen 😕. ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vorstellung Stadtwerke/EVU",
          "intent": "SM_aboutUs",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Erzähle mir etwas über euch.\n\n",
            "Gehört ihr der Stadt?\n\n",
            "Ich möchte etwas mehr über euch wissen."
          ],
          "description": "Der Kunde möchte etwas über die Stadtwerke/das EVU erfahren",
          "texts": [
            {
              "text": "Die ##utilityName## sind dein **regionaler Energielieferant und Infrastrukturdienstleister**. Von uns erhältst du Strom, Erdgas und Wasser zu attraktiven Konditionen 🤗.\\\n\\\nWir kümmern uns um unsere Stadt und ihre Bürger!",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zertifizierungen",
          "intent": "SM_certifications",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ansprechpartner für Energiemanagement gesucht",
            "Grundsätze zum Umwelt-, Qualitäts-, und Energiemanagement",
            "Seid ihr zertifiziert?"
          ],
          "description": "Der Kunde will Informationen zu Zertifizierungen des Energieversorgers",
          "texts": [
            {
              "text": "Zum Themengebiet Zertifizierungen habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Kommunale Services",
      "Intents": [
        {
          "name": "Abfallgebühr",
          "intent": "SM_wasteDisposal",
          "entity": {
            "entityName": "fees",
            "normalizedEntityValue": "Abfallgebühr"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Abfallgebühr.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Aktuelle Veranstaltungen",
          "intent": "SM_currentEvents",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Welche Events sind dieses Jahr geplant?",
            "Zeige mir den Veranstaltungskalender.",
            "Welche Veranstaltungen sind aktuell geplant?"
          ],
          "description": "Der Kunde möchte eine Auskunft zu aktuellen Veranstaltungen",
          "texts": [
            {
              "text": "Zum Themengebiet Veranstaltungen habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anrufsammeltaxi",
          "intent": "SM_collectiveTaxi",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo hält das Anrufsammeltaxi?",
            "Wie sind die Fahrzeiten vom AST?",
            "Gib mir den Fahrplan vom Taxi."
          ],
          "description": "Der Kunde möchte Informationen über das Anrufsammeltaxi",
          "texts": [
            {
              "text": "Zum Themengebiet Fahrplan habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Erdgastankstelle",
          "intent": "SM_naturalGasStation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo ist das Tanken mit Erdgas möglich? ",
            "Was kostet das Tanken an der Erdgastankstelle?",
            "Hast du Informationen zur Erdgastankstelle?"
          ],
          "description": "Der Kunde möchte Informationen zu einer Erdgastankstelle",
          "texts": [
            {
              "text": "Tut mir leid, zum Thema Erdgastankstelle habe ich aktuell keine Informationen😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zu Baustellen/-maßnahmen",
          "intent": "SM_constructionSite",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo wird bald gebaut?",
            "Ich brauche Baustelleninfos.",
            "Informationen zu Baumaßnahmen"
          ],
          "description": "Der Kunde möchte Informationen zu aktuellen Baustellen und Baumaßnahmen",
          "texts": [
            {
              "text": "Zum Themengebiet Baustellen und Baumaßnahmen habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Müllentsorgung",
          "intent": "SM_wasteDisposal",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe Fragen zum Müll. ",
            "Wann wird die Mülltonne mal wieder geleert?",
            "Ansprechpartner für Abfallentsorgung"
          ],
          "description": "Der Kunde möchte Informationen zur Müllentsorgung.",
          "texts": [
            {
              "text": "Zum Thema Abfallentsorgung habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Parken",
          "intent": "SM_parking",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie komme ich zur Parkanlage?",
            "Ich will einen Dauerparkplatz?",
            "Ich habe eine Frage bezüglich des Parkens? "
          ],
          "description": "Der Kunde möchte Informationen zu den Parkmöglichkeiten",
          "texts": [
            {
              "text": "Eine Übersicht zu den Parkmöglichkeiten in ##adressCity## findest du auf folgender Seite 🚗",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Schwimmbad",
          "intent": "SM_swimmingPool",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich hätte gerne Informationen zum Schwimmbad.",
            "Wie sind die Öffnungszeiten des Hallenbads?",
            "Wann finden die Schwimmkurse statt?"
          ],
          "description": "Der Kunde möchte Informationen zu den Schwimmbädern",
          "texts": [
            {
              "text": "Alle Informationen rund um deinen Besuch im **Hallen- oder Waldschwimmbad** findest du auf unserer Webseite 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Informationen zu unseren Bädern ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Straßenreinigungsgebühr",
          "intent": "SM_wasteDisposal",
          "entity": {
            "entityName": "fees",
            "normalizedEntityValue": "Straßenreinigungsgebühr"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zur Straßenreinigungsgebühr.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wasserdruck",
          "intent": "SM_water",
          "entity": {
            "entityName": "waterProperties_L",
            "normalizedEntityValue": "Druck"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zum Wasserdruck.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wasserhärte",
          "intent": "SM_water",
          "entity": {
            "entityName": "waterProperties_L",
            "normalizedEntityValue": "Härte"
          },
          "utterances": [
            "Welchen Härtegrad hat das Wasser?"
          ],
          "description": "Der Kunde möchte Informationen zur Wasserhärte.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wasserversorgung",
          "intent": "SM_water",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe Fragen zum Wasser.",
            "Was kostet ein Kubikmeter Wasser?"
          ],
          "description": "Der Kunde möchte Informationen zur Wasserversorgung.",
          "texts": [
            {
              "text": "Alle Informationen rund um das Trinkwasser in ##adressCity## findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Wasser in Musterstadt ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Zähler und Messwesen",
      "Intents": [
        {
          "name": "Anleitung Zählerstandsablesung",
          "intent": "MR_readingInstruction",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie lese ich ab?",
            "Wasserzähler ablesen, weiß nicht wie.",
            "Was genau muss ich am Stromzähler ablesen?"
          ],
          "description": "Der Kunde möchte eine Anleitung für die Ablesung des Zählerstands mit anschließender Nachfrage, ob der Benutzer den Zählerstand mitteilen möchte.",
          "texts": [
            {
              "text": "Möchtest du uns jetzt deinen Zählerstand mitteilen?",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zählerstand mitteilen",
                  "value": "Zählerstand mitteilen",
                  "answer_config": 69229,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Den Zählerstand liest du von **links nach rechts** auf deinem Zähler ab. Die **Ziffern vor dem Komma** reichen für die Erfassung des Zählerstandes aus.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anleitung Zählerstandsablesung Smarter Zähler",
          "intent": "MR_readingInstruction",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Smarter Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Anleitung für die Ablesung des Zählerstands bei einem smarten Zähler.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Bestätigung ZS-Erfassung",
          "intent": "MR_confirmationMessage",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich eine Bestätigung der Zählerstandserfassung?"
          ],
          "description": "Der Kunde möchte die Beantwortung von Rückfragen bzgl. Bestätigung des Eingangs einer Zählerstandsmitteilung",
          "texts": [
            {
              "text": "In der Regel erhältst du **direkt nach der Abgabe** deines Zählerstände eine **Bestätigung** ✅. \nIm Nachgang erhältst du keine gesonderte Mitteilung.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Erfassung der Zählerstände",
          "intent": "MR_tellMeterReading",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Das ist mein jetziger Zählerstand: 59525",
            "Ich möchte meinen Zählerstand mitteilen.",
            "Ich würde gerne meinen Wasserzählerstand übermitteln."
          ],
          "description": "Der Kunde möchte eine Erfassung der Zählerstände bzw. Erfassung der abgelesenen Zählerstände direkt im Chat oder Verlinkung auf Ableseseiten.",
          "texts": [
            {
              "text": "❌ Der Zählerstand (HT) scheint nicht plausibel zu sein 😟 Bitte Zählerstand zur Bestätigung unten im Chat eintippen 👇\r ",
              "buttons": null
            },
            {
              "text": "❌ Der Zählerstand scheint leider nicht plausibel zu sein 😟 Bitte Zählerstand zur Bestätigung *unten im Chat* eintippen 👇\r \r ",
              "buttons": null
            },
            {
              "text": "Zählernummer",
              "buttons": null
            },
            {
              "text": "Vertragsnummer",
              "buttons": null
            },
            {
              "text": "Zählernummer",
              "buttons": null
            },
            {
              "text": "Zählerstand: NT (kWh)",
              "buttons": null
            },
            {
              "text": "z.B. ES1207445544",
              "buttons": null
            },
            {
              "text": "z.B. EG1207445544",
              "buttons": null
            },
            {
              "text": "z.B. EW1207445544",
              "buttons": null
            },
            {
              "text": "Zählernummer",
              "buttons": null
            },
            {
              "text": "Vertragsnummer",
              "buttons": null
            },
            {
              "text": "Bitte wähle aus, für welche Sparten du deine Zählerstände mitteilen möchtest:👇",
              "buttons": null
            },
            {
              "text": "Vertragsnummer (Testvertragsnr: 1 oder 2)",
              "buttons": null
            },
            {
              "text": "Zählernummer (Vertragsnr.1: 1099428036 oder Vertragsnr.2: 1481287772)",
              "buttons": null
            },
            {
              "text": "z.B. EPV1207445544",
              "buttons": null
            },
            {
              "text": "Vertragsnummer",
              "buttons": null
            },
            {
              "text": "Das habe ich mir notiert!\n\nGeben Sie nun bitte den *NT Zählerstand* ein.\n",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": " ✅ Vielen Dank! Dein Zählerstand wurden erfolgreich erfasst und in unserem System hinterlegt 🤗 \r \rIn Kürze erhältst du von uns eine Bestätigung per E-Mail 📧 Diese geht an deine im System hinterlegte E-Mail-Adresse.",
              "buttons": null
            },
            {
              "text": "Vielen Dank! Ich habe diesen Zählerstand gespeichert. Bitte gebe nun den *nächsten Zählerstand* ein.",
              "buttons": null
            },
            {
              "text": "Sehr gut! Für die Aufnahme deines Zählerstandes benötige ich folgende Daten von dir 👇",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": "❌ Der Zählerstand (NT) scheint nicht plausibel zu sein 😟 BitteZählerstand zur Bestätigung unten im Chat eintippen 👇\r \r ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2020-06-10T07:43:48.000Z"
        },
        {
          "name": "Erfassung der Zählerstände Smarter Zähler",
          "intent": "MR_tellMeterReading",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Smarter Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Erfassung der Zählerstände bzw. Erfassung der abgelesenen Zählerstände direkt im Chat oder Verlinkung auf Ableseseiten und erhält die Erklärung, dass die Erfassung bei einem intelligenten Messystem nicht notwendig ist.",
          "newIntent": false,
          "creationTimestamp": "2020-06-10T07:43:48.000Z"
        },
        {
          "name": "Erforderlichkeit des Messwandlerzählereinbaus",
          "intent": "meterInstallationNecessity",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Messwandlerzähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, ob und unter welchen Voraussetzungen ein Messwandlerzähler ein- oder umgebaut werden muss.",
          "newIntent": false,
          "creationTimestamp": "2022-03-31T09:04:31.000Z"
        },
        {
          "name": "Erforderlichkeit eines Zählereinbaus",
          "intent": "meterInstallationNecessity",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was ist der Smart Meter Rollout?",
            "Kann ich mir auch freiwillig ein Smart Meter einbauen lassen?",
            "Auf welcher gesetzlichen Grundlage werden intelligente Messsysteme eingeführt?"
          ],
          "description": "Der Kunde möchte wissen, ob und unter welchen Voraussetzungen ein bestimmter Zähler ein- oder umgebaut werden muss (z. B. im Rahmen des Smart Meter Rollouts).",
          "texts": [
            {
              "text": "Im Rahmen des sogenannten **Smart Meter Rollouts** sollen mehr und mehr Haushalte in Deutschland mit modernen oder intelligenten Messsystemen ausgerüstet werden. Die Einbauverpflichtung ist bei Verbrauchern **abhängig vom jährlichen Stromverbrauch** und bei Stromerzeugern von der **Leistung ihrer Erzeugungsanlage**.\n\n💡 Alle Verbraucher können sich in der Regel auch unabhängig von der Höhe ihres Stromverbrauchs **freiwillig** für den Einbau eines intelligenten Messsystems entscheiden.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Weitere Informationen ↗",
                  "value": "https://www.bundesnetzagentur.de/DE/Vportal/Energie/Metering/start.html#doc877316bodyText4",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-31T09:04:31.000Z"
        },
        {
          "name": "Erläuterung PV ZW-Kennziffern",
          "intent": "MR_PvMeterDefinition",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Unterschied zwischen Ein- und Ausspeisezähler?",
            "Was bedeuten die ZW-Kennziffern 1.8.0 und 2.8.0?",
            "Was ist 1.8.1?"
          ],
          "description": "Der Kunde möchte eine Erläuterung der Kennziffern auf einer PV-Anlage",
          "texts": [
            {
              "text": "Klar, ich erläutere gern die Bedeutung der ZW-Kennziffern (Zählwerkskennziffern) 😉\n\n\n1.8.0 = Strombezug aus dem Netz\n\n2.8.0 = Stromeinspeisung in das Netz",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Fehlerhafte Wasserzähler(-stände)",
          "intent": "MR_brokenMeter",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Wasserzähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen, was bei einem defekten Wasserzähler zu tun ist.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Fehlerhafte Zähler(-stände)",
          "intent": "MR_brokenMeter",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Mein Gaszähler muss repariert werden.",
            "Ich denke mein Zähler ist kaputt.",
            "Mein Zähler dreht sich nicht mehr. "
          ],
          "description": "Der Kunde möchte Informationen, was bei einem defekten Zähler zu tun ist.",
          "texts": [
            {
              "text": "Wenn du den **Verdacht** hast, dass dein **Stromzähler defekt** ist, solltest du dich an den zuständigen Messstellen- bzw. Netzbetreiber oder deinen Energieversorger wenden.\\\n\\\nEine Befundprüfung kann Aufschluss über einen möglichen Defekt des Zählers geben.\\\nDie **Kosten** der Überprüfung sind in der Regel vorab vom **##customer## zu bezahlen** ☝.",
              "buttons": null
            },
            {
              "text": "Ist dein Zähler **tatsächlich defekt**, korrigieren wir deine Rechnung gern im Nachgang 😊.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Fehlfunktion des Tarifschaltgeräts",
          "intent": "MR_differenceHTNT",
          "entity": {
            "entityName": "malfunction_L",
            "normalizedEntityValue": "Fehlfunktion"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen, was bei einem defekten Tarifschaltgerät zu tun ist.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Gartenwasserzähler",
          "intent": "SM_gardenWaterMeter",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich brauche einen Zähler für Gartenwasser.",
            "Ich brauche eine zweite Wasseruhr für den Wasserhahn im Garten.",
            "Ich benötige einen zusätzlichen Zähler im Außenbereich."
          ],
          "description": "Der Kunde möchte Informationen zu Gartenwasserzählern",
          "texts": [
            {
              "text": "Alle Informationen rund um die Vorteile und Kosten eines **Sonderwasserzählers** findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Sonderwasserzähler ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hochtarif und Niedertarif",
          "intent": "MR_differenceHTNT",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie ist die Niedertarif Zeit?",
            "Informationen zur Umschaltung auf Doppeltarifzähler.",
            "Unterschied zwischen Nachttarif und Hochtarif Zählerstände."
          ],
          "description": "Der Kunde möchte eine Erläuterung zu den Themen Hochtarif und Niedertarif.",
          "texts": [
            {
              "text": "**Doppel- oder auch Zweitarifzähler** sind dazu in der Lage, den Stromverbrauch für **zwei Zeitabschnitte** getrennt zu erfassen: **Tagsüber**🌞 wird zum Hochtarif (HT), **nachts** 🌛 zum in der Regel günstigeren Niedertarif (NT) abgerechnet.\n\nDen jeweiligen Verbrauch liest du auf dem entsprechend beschrifteten Zählwerk ab.\n\n💡 Gut zu wissen: Die genauen **Schaltzeiten** erfährst du von deinem **Netzbetreiber**. Diesen findest du unter anderem auf deiner letzten Rechnung oder deinem Zähler.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zählerstand mitteilen",
                  "value": "Zählerstand mitteilen",
                  "answer_config": 69229,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Installationsvoraussetzungen für einen Zähler",
          "intent": "meterInstallationRequirements",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie muss mein Zählerplatz aussehen, um dort ein Smart Meter einbauen zu können?",
            "Braucht man bestimmte Anschlussmöglichkeiten, um einen intelligenten Zähler zu installieren?",
            "Brauche ich einen Internetanschluss damit ich ein iMsys installieren kann?"
          ],
          "description": "Der Kunde möchte wissen, welche technischen Voraussetzungen erfüllt sein müssen, um einen bestimmten Zähler installieren zu können.",
          "texts": [
            {
              "text": "Wenn du wissen möchtest, welche **Voraussetzungen für die Installation eines bestimmten Messsystems** erfüllt sein müssen, wende dich am besten direkt an deinen Netzbetreiber bzw. Messstellenbetreiber.\n\nDiesen findest du unter anderem auf deiner letzten Strom- bzw. Gasrechnung sowie auf deinem Zähler.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-24T15:17:39.000Z"
        },
        {
          "name": "Keine Ableseaufforderung erhalten",
          "intent": "MR_noReadingRequest",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Bekomme ich wieder eine Ablesekarte?",
            "Hab keine Aufforderung zur Zählerstandabgabe bekommen.",
            "Habt ihr schon meinen Zählerstand erhalten?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, was er machen soll, wenn er keine Aufforderung zur Zählerstandserfassung erhalten hat",
          "texts": [
            {
              "text": "Falls du **keine Aufforderung oder Ablesekarte** zur Zählerstandserfassung \nerhalten hast, kannst du mir gerne deinen Zählerstand mitteilen 😊!\n\n\nMöchtest du jetzt deinen Zählerstand melden? 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zählerstand mitteilen",
                  "value": "Ich möchte meinen Zählerstand mitteilen",
                  "answer_config": 69229,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kundeneigener Zähler",
          "intent": "customerOwnedMeter",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Sind kundeneigene Zähler jetzt verboten?",
            "Ich suche Informationen zu kundeneigenen Zählvorrichtungen",
            "Eigenen Zähler einsetzen"
          ],
          "description": "Der Kunde möchte wissen, ob kundeneigene Zähler weiterhin verwendet werden können.",
          "texts": [
            {
              "text": "Der Einbau und Betrieb eines Zählers darf entsprechend des **Messstellenbetriebsgesetzes** nur noch durch den Messstellenbetreiber erfolgen. Die **Neuinstallation kundeneigener Zähler** ist daher leider **nicht mehr zulässig**.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-22T09:33:02.000Z"
        },
        {
          "name": "Löschen historischer Zählerstände",
          "intent": "meterDataDeletion",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich eine Löschung meiner alten Zählerstände durchführen?",
            "Wann werden meine Zählerstände gelöscht?",
            "Ich möchte meine Zählerstände aus dem Smart Meter löschen"
          ],
          "description": "Der Kunde möchte wissen, ob und wie historische Daten eines Zählers gelöscht werden können.",
          "texts": [
            {
              "text": "Um **historische Zählerstände** aus deiner Messeinrichtung zu **löschen**, nimm am besten direkt Kontakt zu deinem Messstellenbetreiber auf.\n\nDiesen findest du u. a. auf deiner Strom- und Gasrechnung sowie auf deinem Zähler.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-10T07:38:27.000Z"
        },
        {
          "name": "OBIS-Kennzahlen Erläuterung",
          "intent": "MR_OBISnumber",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Können Sie mir erklären, was die OBIS Nummer sein soll?",
            "Ich verstehe nicht was eine OBIS Zahl bedeutet.",
            "OBIS Kennzahl nicht zu finden, was ist das?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, was die OBIS Nummer ist und wofür sie benutzt wird",
          "texts": [
            {
              "text": "Bei einer **OBIS Kennziffer** handelt es sich um eine im Energiemarkt gebräuchliche Definition des **Zählwerks auf dem Stromzähler**.\\\n\\\n💡 Mit Hilfe dieser Kennzahlen kann man den **abgelesenen Zählerstand** in der Ablesekarte oder im Kundenportal **richtig erfassen**.",
              "buttons": null
            },
            {
              "text": "| Nummer | Bezeichnung |\n|--|--|\n|1.8.0|Summe von HT und NT|\n|1.8.1|HT Verbrauch|\n|1.8.2|NT Verbrauch|\n|2.8.0|Summe von HT und NT|\n|2.8.1|HT Einspeisung|\n|2.8.2|NT Einspeisung|",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Ort des Zählers",
          "intent": "MR_meterLocation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo ist der Wasserzähler?",
            "Wo finde ich meinen Gaszähler?",
            "Wo befindet sich der Stromzähler?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, wo der Zähler i.d.R. zu finden ist",
          "texts": [
            {
              "text": "Meistens ist der **Zähler direkt in der Wohnung** zu finden. Solltest du in einem **Einfamilienhaus** wohnen, findest du den Zähler meist im Keller oder Hausflur. In manchen **Wohnanlagen** sind Stromzähler auch im Treppenhaus verbaut.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Plombierung von Zählern",
          "intent": "meterSealing",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Infos zur Plombierung vom Zähler.",
            "Wie verplombe ich meinen Zähler?",
            "Wieso kommt es zur Verplombung?"
          ],
          "description": "Der Kunde fragt nach der Verplombung seines Zählers",
          "texts": [
            {
              "text": "Die **Verplombung eines Zählers** schützt diesen vor unrechtmäßigem Zugriff und Manipulation.\n\nBitte **entferne eine Plombe niemals selbstständig**, sondern nehme bei Fragen Kontakt zu unserem Kundenservice auf.\n",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-15T09:00:00.000Z"
        },
        {
          "name": "Probleme bei der Zählerstandserfassung",
          "intent": "meterReadingProblem",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich kann meinen Zählerstand nicht erfassen.",
            "probleme bei der zählerstandserfassung",
            "Warum kann ich den Zählerstand online nicht einstellen?",
            "Wieso kann ich meinen Zählerstand nicht mitteilen?"
          ],
          "description": "Der Kunde fragt, wieso die Zählerstandserfassung nicht funktioniert.",
          "texts": [
            {
              "text": "Du hast  **Probleme mit der Erfassung deiner Zählerstände**?\n \n Ich bin mir sicher, dass meine ##colleagueplural## weiterhelfen können 🙂",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontaktdaten",
                  "value": "Kontaktdaten",
                  "answer_config": 69304,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-08-23T09:33:06.000Z"
        },
        {
          "name": "Smart Meter Upgrade",
          "intent": "smartMeterUpgrade",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Kann ich meinen alten Zähler als Smart Meter upgraden?",
            "Was ist ein Smart Meter Gateway?",
            "Wie lässt sich mein Zähler zum Smart Meter umrüsten?"
          ],
          "description": "Der Kunde möchte wissen, wie die Aufrüstung eines Zählers zum Smart Meter mittels Gateway erfolgen kann.",
          "texts": [
            {
              "text": "Moderne Messeinrichtungen können mit einem sogenannten **Smart-Meter-Gateway (SMGW)** erweitert werden, wodurch die **Nutzung als intelligentes Messsystem bzw. Smart Meter** möglich ist.\n\nDas Smart-Meter-Gateway ist die **zentrale Kommunikationseinheit** des intelligenten Messsystems. Es empfängt die Messdaten von der modernen Messeinrichtung und leitet diese in das Kommunikationsnetz weiter.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-22T12:49:13.000Z"
        },
        {
          "name": "Turnus Zählerstandserfassung",
          "intent": "MR_readingTime",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie oft muss ich euch meine Ablesewerte melden?",
            "Wie oft werden die Zählerstände erfasst?",
            "Zu welcher Zeit soll ich den Zählerstand ablesen?"
          ],
          "description": "Der Kunde möchte eine Erläuterung über Turnus und Möglichkeiten der Zählerstandserfassung",
          "texts": [
            {
              "text": "In der Regel bitten wir dich **einmal im Jahr**, uns deinen aktuellen Zählerstand mitzuteilen. Entweder kommt jemand vom Netzbetreiber bei dir vorbei und liest den Zähler ab oder du erhältst eine Ablesekarte **per Post** 📩 oder **E-Mail** 💻.",
              "buttons": null
            },
            {
              "text": "Wenn wir **keinen Zählerstand von dir erhalten** haben, müssen wir deinen Verbrauch auf Grundlage des bisherigen Verbrauches für die Jahresabrechnung schätzen.",
              "buttons": null
            },
            {
              "text": "Natürlich kannst du uns deinen Zählerstand auch zwischendurch jederzeit mitteilen 😊.",
              "buttons": null
            },
            {
              "text": "Möchtest du uns jetzt deinen Zählerstand mitteilen?",
              "buttons": null
            },
            {
              "text": "Perfekt!",
              "buttons": null
            },
            {
              "text": "Kein Problem. Du kannst dich jederzeit bei mir melden.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zu Zähler und Zählerstand",
          "intent": "meterReadingOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich suche Informationen zu meinem Zähler",
            "Ich habe eine Frage zum Gaszähler",
            "Fragen zu Zählern und Zählerstand"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Zähler und Zählerstand.",
          "texts": [
            {
              "text": "Du suchst Informationen zum Themenbereich **Zähler und Zählerstand**?\r \r Wähle einfach eine der Optionen aus oder gib unten eine andere Frage ein. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Hilfe beim Ablesen",
                  "value": "Wie lese ich den Zählerstand ab?",
                  "answer_config": 69226,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Zähler finden",
                  "value": "Wo finde ich meinen Zähler?",
                  "answer_config": 69220,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Zählernummer erkennen",
                  "value": "Wo finde ich die Zählernummer?",
                  "answer_config": 69222,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zählerstand mitteilen",
                  "value": "Zählerstand mitteilen",
                  "answer_config": 69229,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-04T08:19:48.000Z"
        },
        {
          "name": "Unplausibler Zählerstand",
          "intent": "MR_implausibleMeterReading",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Mein Zählerstand ist unplausibel."
          ],
          "description": "Der Kunde möchte wissen, was eine \"unplausible Zählerstandseingabe\" bedeutet",
          "texts": [
            {
              "text": "Ein **Zählerstand ist unplausibel**, wenn die übermittelten Zählerstände auf Basis der uns bekannten Vergangenheitswerte nicht korrekt erscheinen.\n\nFolgende **Ursachen** können hierfür verantwortlich sein:\n- Eingabe-/Tippfehler\n- deutlich niedrigerer Verbrauch aufgrund von Leerstand\n- Einbau eines neuen Zählers",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Verarbeitung von Zählerdaten",
          "intent": "meterDataProcessing",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist ein iMsys wirklich sicher?",
            "Sind meine Daten bei der Verwendung eines intelligenten Messsystems geschützt?",
            "Werden meine Zählerdaten verschlüsselt weitergegeben?"
          ],
          "description": "Der Kunde möchte wissen, wie die Erfassung und Verarbeitung von Zählerstands- und Verbrauchsdaten erfolgt.",
          "texts": [
            {
              "text": "**Zählerstands- und Verbrauchsdaten** werden lediglich **bei intelligenten Messsystemen automatisiert erfasst**. In der Regel werden diese alle 15 Minuten an das Smart-Meter-Gateway weitergeleitet. Hier werden die Daten verarbeitet und über das Mobilfunknetz an den jeweiligen Messstellenbetreiber übermittelt.\n\nFür genauere Informationen wende dich am besten direkt an deinen **Netzbetreiber** oder **Messstellenbetreiber**. Diesen findest du u. a. auf deiner letzten Strom- oder Gasrechnung sowie auf deinem Zähler.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-22T16:09:41.000Z"
        },
        {
          "name": "Verspätete Zählerstandserfassung",
          "intent": "MR_belatedMeterReading",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was passiert, wenn ich meinen Zählerstand zu spät eintrage.",
            "Mein Zählerstand wurde zu hoch geschätzt.",
            "Warum wurde mein Zählerstand geschätzt?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, was bei verspäteter Abgabe des Zählerstands passiert",
          "texts": [
            {
              "text": "Wenn du deinen **Zählerstand nicht rechtzeitig abgibst**, dann wird dein neuer Abschlag mithilfe historischer Daten und Simulationen bestimmt.\n\nBitte teile uns den aktuellen Zählerstand mit. Dadurch können wir unsere Prognose auf Plausibilität prüfen und diese ggf. auf Grundlage des aktuelleren Ergebnisses neu berechnen.\n",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Zählerstand mitteilen",
                  "value": "Zählerstand mitteilen",
                  "answer_config": 69229,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vorgaben zum Ort des Zählers",
          "intent": "MR_meterLocation",
          "entity": {
            "entityName": "meterLocGuidelines_Reg",
            "normalizedEntityValue": "meterLocGuidelines_Reg"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Erläuterung welche Vorgaben es für den Zählerplatz zu beachten gibt.",
          "texts": [
            {
              "text": "Der **Zählerplatz** in deinem Gebäude hat bestimmte **Vorgaben**, wie dieser auszusehen hat.\n\nAm besten ist es, wenn du dich diesbezüglich direkt an deinen **Elektriker** wendest. Er kennt die Regularien & kann dich hier bestens unterstützen!\n\nAlternativ findest du die Richtlinien hier:   ",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zählerplatz Richtlinien ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vorteile digitaler Zähler",
          "intent": "digitalMeterBenefits",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, welche Vorteile digitale Zähler (iMsys, mMe) mit sich bringen.",
          "texts": [
            {
              "text": "Mit einem digitalen Zähler profitierst du von vielen Vorteilen. 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Alle Vorteile ansehen ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-23T14:20:54.000Z"
        },
        {
          "name": "Vorteile moderner Zähler",
          "intent": "digitalMeterBenefits",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Moderner Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, welche Vorteile moderne Zähler (mMe) mit sich bringen.",
          "newIntent": false,
          "creationTimestamp": "2022-02-23T14:20:54.000Z"
        },
        {
          "name": "Vorteile smarter Zähler",
          "intent": "digitalMeterBenefits",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Smarter Zähler"
          },
          "utterances": [
            "Für wen lohnt sich ein Smart Meter?",
            "Was sind die Vorteile eines intelligenten Messsystems?",
            "Wie spare ich durch ein Smart Meter Geld?"
          ],
          "description": "Der Kunde möchte wissen, welche Vorteile intelligente Zähler (iMsys) mit sich bringen.",
          "newIntent": false,
          "creationTimestamp": "2022-02-23T14:20:54.000Z"
        },
        {
          "name": "Zähler-PIN",
          "intent": "meterPIN",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich meine Zähler PIN eingeben?",
            "Wo finde ich die PIN für mein Smart Meter?",
            "Wie kann ich eine neue PIN für meinen Zähler vergeben?"
          ],
          "description": "Der Kunde hat eine Frage zur PIN-Vergabe oder -Änderung für einen Zähler.",
          "texts": [
            {
              "text": "Für Fragen rund um das Thema **Zähler-PIN** ist in aller Regel dein **Messstellenbetreiber** oder **Netzbetreiber** der richtige Ansprechpartner. Diesen findest du u. a. auf deiner Strom- und Gasrechnung sowie an deinem Zähler.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-23T07:11:32.000Z"
        },
        {
          "name": "Zählereichung",
          "intent": "meterCalibration",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich meinen Zähler eichen?",
            "Was hat es mit der Eichfrist auf sich?",
            "Ich suche Infos zur Zählereichung"
          ],
          "description": "Der Kunde hat eine Frage zur Eichung eines Zählers.",
          "texts": [
            {
              "text": "Du hast eine Frage zur **Eichung eines Zählers**? \n\nHierfür ist in aller Regel dein **Messstellenbetreiber** der richtige Ansprechpartner. Diesen findest du u. a. auf deiner Strom- und Gasrechnung sowie auf deinem Zähler.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-23T07:11:32.000Z"
        },
        {
          "name": "Zählereinbau und -ausbau",
          "intent": "infoWhenMeterInstallation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zum Ein-, Aus- oder Umbau seines Zählers und spezifiziert die Art des Zählers nicht genauer.",
          "texts": [
            {
              "text": "Bei Fragen zum Ein-, Aus- oder Umbau von Zählern wende dich bitte an deinen Netzbetreiber oder Messstellenbetreiber. Diesen findest du direkt auf deinem Zähler oder auf deiner letzten Rechnung.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Fertigmeldeformular ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählereinbau und -ausbau PV-Zähler",
          "intent": "infoWhenMeterInstallation",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "PV-Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zum Ein-, Aus- oder Umbau seines PV-Zählers.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählereinbau und -ausbau Smarter Zähler",
          "intent": "infoWhenMeterInstallation",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Smarter Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zum Ein-, Aus- oder Umbau seines smarten Zählers.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählereinbau und -ausbau Wasserzähler",
          "intent": "infoWhenMeterInstallation",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Wasserzähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zum Ein-, Aus- oder Umbau seines Wasserzählers.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählereinbau und -wechsel Inbetriebsetzungsformular",
          "intent": "infoWhenMeterInstallation",
          "entity": {
            "entityName": "adverbialMarker_L",
            "normalizedEntityValue": "Temporal"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat Rückfragen zum Ein- oder Umbau seines Zählers nachdem das Inbetriebsetzungsformular durch den Elektroinstallateur vorliegt.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählerimpulse",
          "intent": "meterPowerPulse",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich möchte die Impulsrate meines Zählers messen.",
            "Ich suche Informationen zu Impulsfrequenzen.",
            "Wie kann ich Leistungsimpulse auslösen?"
          ],
          "description": "Der Kunde hat eine Frage zur Impulsfrequenz oder -messung an einem Zähler.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-03-31T08:02:07.000Z"
        },
        {
          "name": "Zählerkosten",
          "intent": "meterCosts",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie teuer ist so ein digitaler Zähler?",
            "Muss ich den neuen Zähler selbst zahlen?",
            "Wie hoch sind die Kosten für ein intelligentes Messsystem?"
          ],
          "description": "Der Kunde möchte wissen, welche Kosten für die Installation und Nutzung eines Zählers anfallen und wer diese Kosten trägt.",
          "texts": [
            {
              "text": "Du hast eine Frage zu den **Kosten eines Zählers**? \r \r Hierfür ist in aller Regel dein **Messstellenbetreiber** der richtige Ansprechpartner. Diesen findest du u. a. auf deiner Strom- und Gasrechnung sowie auf deinem Zähler.\n\nGrundsätzlich besteht für **moderne Messeinrichtungen** und **intelligente Messsysteme** eine Einbauverpflichtung mit festgelegten Preisobergrenzen. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Mehr zur Einbauverpflichtung",
                  "value": "Für wen gilt die Einbauverpflichtung für Zähler?",
                  "answer_config": 69197,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-23T12:25:00.000Z"
        },
        {
          "name": "Zählernummer finden",
          "intent": "MR_meterNumberLocation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie finde ich die Zählernummer?",
            "Wo steht die Stromzählernummer?",
            "Woran erkenne ich die Nummer vom Zähler?"
          ],
          "description": "Der Kunde möchte eine Erläuterung, wo am Zähler die Zählernummer abgebildet ist",
          "texts": [
            {
              "text": "Du findest die **Zählernummer** auch auf deiner **letzten Energierechnung** und, falls vorhanden, auf der Ablesekarte.\\\n \\\n**Neukunden** außerdem auf ihrem Wohnungsübergabeprotokoll.",
              "buttons": null
            },
            {
              "text": "Die **Zählernummer** deines Strom-/Gas-/Wasserzählers findest du auf der **Vorderseite des Gerätes**, oft in der Nähe eines Strichcodes.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählernummer korrigieren",
          "intent": "MR_wrongMeterNumber",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Falsche Zählernummer eingegeben.",
            "Ich möchte meine Zählernummer korrigieren.",
            "Meine Zählernummer ist falsch. "
          ],
          "description": "Erläuterung, was zu tun ist bei Eingabe falscher Zählernummer und ggf. Anzeige der Servicenummer",
          "texts": [
            {
              "text": "Sollte deine **Zählernummer falsch** sein, kannst du diese gerne korrigieren.\\\n\\\nBitte wende dich dazu an unsere **kostenfreie Servicenummer**:\\\n📞 **##customerServiceNr##**",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählersperrung",
          "intent": "meterBlockage",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Zählersperre rückgängig machen",
            "Zähler wurde gesperrt",
            "Wies habt ihr meinen stromzähler gesperrt?"
          ],
          "description": "Der Kunde möchte wissen, in welchen Fällen es zu einer Zählersperrung kommen kann und wie er diese behebt.",
          "texts": [
            {
              "text": "Du hast eine **Sperrankündigung** erhalten oder dein **Zähler wurde bereits gesperrt**?\n\nBitte nimm in diesem Fall schnellstmöglich Kontakt zu unserem **Kundenservice** auf, damit wir die Angelegenheit gemeinsam lösen können.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-06-23T15:16:50.000Z"
        },
        {
          "name": "Zählerstand korrigieren",
          "intent": "correctMeterReading",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Hallo ich habe einen falschen Zählerstand eingegeben",
            "Ich habe falsche Daten beim Zählerstand eingegeben",
            "Zählerstand falsch eingegeben"
          ],
          "description": "Der Kunde hat einen falschen Zählerstand übermittelt und möchte diesen korrigieren.",
          "texts": [
            {
              "text": "Sofern ein **falscher Zählerstand übermittelt** wurde, nimm am besten direkt Kontakt zu unserem **Kundenservice** auf.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-04-28T09:41:51.000Z"
        },
        {
          "name": "Zählerstandshistorie",
          "intent": "checkPreviousMeterReading",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte nachprüfen, welche Zählerstände zuletzt erfasst bzw. durchgegeben wurden.",
          "texts": [
            {
              "text": "Zum Themengebiet Übersicht über die erfassten Zählerstände habe ich aktuell leider keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Zählertyp",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über die verschiedenen Zählertypen erfahren.",
          "texts": [
            {
              "text": "Unsichtbarer Platzhalter, damit CarouselCards von dieser answer_config angezeigt werden",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp EHZ-Zähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "EHZ-Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über EHZ-Zähler erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp Konventioneller Zähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Konventioneller Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über konventionelle Zähler erfahren.",
          "texts": [
            {
              "text": "Bei einem **konventionellen Zähler** handelt es sich um den bisher herkömmlichen Ferrariszähler. \n \nDer Energieverbrauch wird **elektromechanisch gemessen** 📐 und **vor Ort abgelesen** 🔍. \n\nEin konventioneller Zähler besitzt **ein Zählwerk**, das sich entsprechend dem Energieverbrauch schneller oder langsamer dreht, weshalb er auch **Drehstromzähler** genannt wird.\n\nIm Zuge der **Digitalisierung der Energiewende** werden konventionelle Zähler heute nicht mehr neu verbaut.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp Messwandlerzähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Messwandlerzähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über Messwandlerzähler erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp Moderner Zähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Moderner Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über moderne Zähler erfahren.",
          "texts": [
            {
              "text": "**Moderne Messeinrichtungen** messen den Energieverbrauch **digital** und besitzen ein Display 📱 , auf welchem Informationen wie bspw. Wochen- oder Jahresverbräuche und die tatsächliche Nutzungszeit angezeigt werden.\n\nDer **Zählerstand** muss **wie bei konventionellen Zählern** abgelesen 🔍 und anschließend an den Energieversorger übermittelt werden.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp Smarter Zähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Smarter Zähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über smarte Zähler erfahren.",
          "texts": [
            {
              "text": "Ein **intelligentes Messsystem** (**Smart Meter**) registriert kontinuierlich den Verbrauch und speichert präzise ab, zu welcher Zeit wie viel Strom benötigt wird. Das **Ablesen** des Zählers sowie das **Übermitteln** von Zählerständen an den Energieversorger **entfällt** dadurch.\n\nModerne Messeinrichtungen können mit einem sogenannten **Gateway** zu einem Smart Meter aufgerüstet werden. Mithilfe dieser Kommunikationseinheit wird eine Fernauslesung möglich gemacht.\n\n💡 Moderne Messeinrichtung + Gateway = Intelligentes Messsystem",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        },
        {
          "name": "Zählertyp Wasserzähler",
          "intent": "meterTypeInfo",
          "entity": {
            "entityName": "meterType_L",
            "normalizedEntityValue": "Wasserzähler"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über Wasserzähler erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-02-23T12:41:35.000Z"
        }
      ]
    },
    {
      "SkillName": "Hausanschluss",
      "Intents": [
        {
          "name": "Anmeldung Gasanschluss",
          "intent": "registerHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Gasanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seinen fertigen Gasanschluss anmelden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anmeldung Hausanschluss",
          "intent": "registerHC",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seinen fertigen Hausanschluss anmelden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anmeldung Mehrspartenanschluss",
          "intent": "registerHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Mehrspartenanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seinen fertigen Mehrspartenanschluss anmelden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anmeldung Stromanschluss",
          "intent": "registerHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Stromanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seinen fertigen Stromanschluss anmelden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Anmeldung Wallbox",
          "intent": "registerHC",
          "entity": {
            "entityName": "WallboxHC_L",
            "normalizedEntityValue": "Wallbox"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seine fertige Wallbox anmelden.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Baukostenzuschuss",
          "intent": "buildingCostSubsidy",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie hoch ist der BKZ",
            "Ab wann muss ich einen BKZ zahlen",
            "Wofür muss der Baukostenzuschuss bezahlt werden"
          ],
          "description": "Der Kunde hat eine Frage zum Baukostenzuschuss",
          "newIntent": true,
          "creationTimestamp": "2022-02-07T14:35:30.000Z"
        },
        {
          "name": "Baustrom-Beantragung",
          "intent": "applyForPCOS",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Baustrom beantragen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Baustromzähler mieten",
          "intent": "PCOSinfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu einem Baustromzähler-/verteiler",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Eigenleistungen",
          "intent": "personalContributions",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen zu möglichen Eigenleistungen, die er im Rahmen des Anschlusses erbringen kann",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Freileitungsisolierung",
          "intent": "isolatePowerLine",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will aufgrund von Arbeiten auf seinem Hausdach die Freileitung isolieren lassen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Gasanschluss",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Gasanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zum Gasanschluss. ",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Gasanschluss - Kosten ",
          "intent": "costsHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Gasanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Kosten eines Gasanschlusses.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Inbetriebnahme",
          "intent": "commissioningSteps",
          "entity": {
            "entityName": "StepsHC_L",
            "normalizedEntityValue": "Inbetriebnahme"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Inbetriebnahme des Hausanschlusses.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Informationen",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zu bestimmten Anschlüssen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Installationsvorgehen",
          "intent": "installationMethodHC",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte sich über die Bauart des Hausanschlusses erkundigen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Kosten",
          "intent": "costsHC",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Kosten eines Hausanschlusses.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Probleme melden",
          "intent": "utilitiesFailure",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde braucht Unterstützung bei Hausanschlussproblemen.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Verlegung",
          "intent": "commissioningSteps",
          "entity": {
            "entityName": "StepsHC_L",
            "normalizedEntityValue": "Verlegung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Verlegung des Hausanschlusses.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss - Vorprüfung",
          "intent": "isHCPossible",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte wissen, ob ein Hausanschluss an seinem Haus möglich ist",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss ändern",
          "intent": "changeHC",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will seinen Hausanschluss ändern",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hausanschluss Inbetriebnahmeschritte",
          "intent": "commissioningSteps",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die notwendigen Schritte bis zur Inbetriebsetzung.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Heizungsanschluss",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "HeatingSystem_L",
            "normalizedEntityValue": "Heizung"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zum Heizungsanschluss. ",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Installateur finden",
          "intent": "findInstallerOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte eine Übersicht zu Monteuren und Installateuren",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Installateurverzeichnis - Eintragung",
          "intent": "enterInstallerOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Ein Installateur möchte sich ins Installateurverzeichnis des Netzbetreiber eintragen lassen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Leitungsauskunft",
          "intent": "lineInformation",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde benötigt aufgrund von Baumaßnahmen eine Leitungsauskunft, damit er keine Leitungen zerstört",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Mehrspartenanschluss",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Mehrspartenanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zum Mehrspartenanschluss.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Mehrspartenanschluss - Kosten",
          "intent": "costsHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Mehrspartenanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Kosten eines Mehrspartenanschlusses.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Micro-Leerrohr",
          "intent": "microEmptyConduit",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Ein Kunde möchte Informationen zur Möglichkeit des Einbaus eines Mikro-Leerrohrs",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Öltankentsorgung",
          "intent": "oilTankDisposal",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Ein Kunde möchte seinen alten Öltank entsorgen lassen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Stromanschluss",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Stromanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zum Stromanschluss.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Stromanschluss - Kosten",
          "intent": "costsHC",
          "entity": {
            "entityName": "ProductTypeHC_L",
            "normalizedEntityValue": "Stromanschluss"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte Informationen über die Kosten eines Stromanschlusses",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "TAB - Informationen",
          "intent": "TAMInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte sich über die technischen Mindestanforderungen für den Netzanschluss informieren",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Übersicht zum Hausanschluss",
          "intent": "houseConnectionOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe eine Frage zum Einspeisen",
            "Informationen EEG",
            "Einspeisung"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Hausanschluss.",
          "newIntent": true,
          "creationTimestamp": "2022-07-12T14:19:25.000Z"
        },
        {
          "name": "Wärmepumpe/Durchlauferhitzer installieren",
          "intent": "installHeatPump",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde will eine Wärmepumpe oder Durchlauferhitzer installieren lassen",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wärmepumpenanschluss",
          "intent": "gridConnectionInfo",
          "entity": {
            "entityName": "HeatingPumpHC_L",
            "normalizedEntityValue": "Wärmepumpe"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde ist ein Bauherr oder Planer und sucht Informationen oder Beratung zum Anschluss einer Wärmepumpe.",
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Öffentlicher Nahverkehr",
      "Intents": [
        {
          "name": "Abonnement",
          "intent": "publicTransportSubscriptions",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich ein Monatsabo abschließen?",
            "Ich möchte mein Abo kündigen."
          ],
          "description": "Der Kunde möchte wissen was ein Abo für den öffenlichen Nahverkehr kostet und wo er es erwerben kann.",
          "texts": [
            {
              "text": "Zum Themengebiet Abo für den öffentlichen Nahverkehr habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-03-08T12:47:57.000Z"
        },
        {
          "name": "Busstreik",
          "intent": "busStrike",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Streiken die Busse heute?",
            "Welche Buslinien sind vom Warnstreik betroffen?",
            "Wie lange dauert der Busstreik?"
          ],
          "description": "Der Kunde möchte Informationen zu aktuellen Streiks im öffentlichen Nahverkehr.",
          "texts": [
            {
              "text": "Zum Themengebiet Streik im öffentlichen Nahverkehr habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-09-25T10:27:15.000Z"
        },
        {
          "name": "Deutschlandticket",
          "intent": "publicTransportTickets",
          "entity": {
            "entityName": "ticketType_L",
            "normalizedEntityValue": "Deutschlandticket"
          },
          "utterances": [
            "Ich möchte Informationen zum Deutschlandticket",
            "Wo kann ich das 49-Euro-Ticket erwerben?",
            "Wie viel kostet das Deutschlandticket?"
          ],
          "description": "Der Kunde möchte wissen, wo er das Deutschlandticket erwerben kann und wie viel es kostet.",
          "newIntent": true,
          "creationTimestamp": "2023-09-21T06:10:29.000Z"
        },
        {
          "name": "Fahrkarten",
          "intent": "publicTransportTickets",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibt es ein Schülerticket?",
            "Was kostet eine Monatsfahrkarte?"
          ],
          "description": "Der Kunde möchte wissen was eine Fahrkarte für den öffenlichen Nahverkehr kostet und wo er sie erwerben kann.",
          "texts": [
            {
              "text": "Zum Themengebiet Fahrkarten habe ich aktuell leider keine Informationen 😕",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-03-08T12:47:57.000Z"
        },
        {
          "name": "Fahrplanauskunft",
          "intent": "scheduleAndMap",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Fahrplanauskunft",
            "Welche Buslinien gibt es in Musterstadt?"
          ],
          "description": "Der Kunde möchte eine Auskunft über den Fahrplan der öffentlichen Verkehrsmittel.",
          "texts": [
            {
              "text": "Zum Themengebiet Fahrplan habe ich aktuell keine Informationen 😕.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-03-08T12:47:57.000Z"
        },
        {
          "name": "Fundsachen",
          "intent": "lostAndFound",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wo kann ich Fundsachen abholen?",
            "Wann öffnet das Fundbüro?"
          ],
          "description": "Der Kunde möchte wissen wo und wann er Fundsachen abholen kann.",
          "texts": [
            {
              "text": "Zum Themengebiet Fundsachen habe ich aktuell leider keine Informationen 😕",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-03-08T12:37:46.000Z"
        }
      ]
    },
    {
      "SkillName": "Small Talk",
      "Intents": [
        {
          "name": "Antwort auf negative Emotionen",
          "intent": "SM_negativeEmotion",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Sehr schlecht.",
            "Leider finde ich da nichts.",
            "Lass gut sein."
          ],
          "description": "Der Kunde ist verärgert und erhält das Angebot einer Kontaktanfrage",
          "texts": [
            {
              "text": "Ich sehe, du bist unzufrieden 🙁. Möchtest du vielleicht den Support kontaktieren?",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontaktdaten",
                  "value": "Ja, Ich möchte den Support kontaktieren",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Antwort auf positive Emotionen",
          "intent": "SM_empathyEmotion",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich finde dich gut.",
            "Ja, gut gemacht.",
            "Sehr schön ist das!"
          ],
          "description": "Bot gibt Antwort auf positive Emotionen",
          "texts": [
            {
              "text": "Das freut mich! 😃",
              "buttons": null
            },
            {
              "text": "🤗😊👍",
              "buttons": null
            },
            {
              "text": "👍",
              "buttons": null
            },
            {
              "text": "Finde ich auch 😊👌",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Begrüßung",
          "intent": "SM_greeting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Guten Tag!",
            "Hallo!",
            "Guten Morgen!"
          ],
          "description": "Der Kunde begrüßt den Bot und erhält eine Rückmeldung",
          "texts": [
            {
              "text": "Hi ✋",
              "buttons": null
            },
            {
              "text": "Hallo 🙂",
              "buttons": null
            },
            {
              "text": "Hey 🙂",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Danke",
          "intent": "SM_thanks",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Super danke!",
            "Dankeschön!",
            "Vielen Dank!"
          ],
          "description": "Bot reagiert auf Bedanken des Kundens",
          "texts": [
            {
              "text": "Das freut mich zu hören! 🙂",
              "buttons": null
            },
            {
              "text": "Freut mich sehr, dass ich dir helfen konnte! 🙂",
              "buttons": null
            },
            {
              "text": "Schön, dass ich dir helfen konnte 🙂",
              "buttons": null
            },
            {
              "text": "Gerne. Freut mich, dass ich dir helfen konnte.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Hilfe",
          "intent": "help",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was kannst du?",
            "Das verstehe ich nicht.",
            "Deine Antworten passen nicht zu meinen Fragen."
          ],
          "description": "Anzeige von Funktionen des Bots",
          "texts": [
            {
              "text": "Momentan kann ich dir allgemeine Fragen zu unseren Dienstleistungen beantworten und \n helfe dir gerne bei folgenden Themengebieten weiter 🙂",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Abschlag und Zahlungen",
                  "value": "Abschlag und Zahlungen",
                  "answer_config": 69061,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Energiemarkt aktuell",
                  "value": "Energiemarkt aktuell",
                  "answer_config": 69115,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Tarife und Produkte ",
                  "value": "Tarife und Produkte",
                  "answer_config": 69282,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Vertragsverwaltung",
                  "value": "Vertragsverwaltung",
                  "answer_config": 69113,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Zähler und Zählerstand",
                  "value": "Zähler und Zählerstand",
                  "answer_config": 69201,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Informationen zum aktuellen Datum",
          "intent": "SM_currentDate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Der wievielte ist heute?",
            "Heutiges Datum?",
            "Welches Datum ist heute?"
          ],
          "description": "Der Kunde möchte eine aktuelle Datumsauskunft",
          "texts": [
            {
              "text": "Informationen zum heutigen Datum findest du hier 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Welcher Tag ist heute? ↗",
                  "value": "https://www.kalenderpedia.de/datum-heute.html",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Lieblingsfarbe",
          "intent": "SM_favouriteColour",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Hast du eine Lieblingsfarbe?",
            "Was ist deine Lieblingsfarbe?",
            "Welche Farbe magst du?"
          ],
          "description": "Der Kunde fragt den Bot nach seiner Lieblingsfarbe",
          "texts": [
            {
              "text": "Wie du sehen kannst, finde ich **orange** 🧡 super!",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Nachfragen zum Bot",
          "intent": "SM_bot",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wer bist du?",
            "Schreibe ich mit einem Bot?",
            "Sag mir deinen Namen."
          ],
          "description": "Der Kunde hat eine Nachfrage zum Bot",
          "texts": [
            {
              "text": "Ich bin **##chatbotName##**, die digitale Assistentin der ##utilityName##. Ich unterstütze meine menschlichen ##colleagueplural## 🙂",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Verabschiedung",
          "intent": "SM_goodbye",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Auf Wiedersehen!",
            "Bis dann!",
            "Tschüss!"
          ],
          "description": "Der Kunde verabschiedet sich und erhält eine Antwort vom Bot",
          "texts": [
            {
              "text": "Auf Wiedersehen 🤗",
              "buttons": null
            },
            {
              "text": "Tschüss, bis bald! 😊",
              "buttons": null
            },
            {
              "text": "Ciao, bis zum nächsten Mal! 🙂",
              "buttons": null
            },
            {
              "text": "Ciao, bis bald! 🤗",
              "buttons": null
            },
            {
              "text": "Bis demnächst, ich wünsche einen schönen Tag! 🙂",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wetter",
          "intent": "SM_weather",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie ist das Wetter?",
            "Ich brauche eine Wettervorhersage.",
            "Ist es heute kalt?"
          ],
          "description": "Der Kunde wünscht eine Anzeige von Wetterinformationen",
          "texts": [
            {
              "text": "Sorry, mit dem Wetter 🌤 kenne ich mich nicht aus.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wie geht es?",
          "intent": "SM_howAreYou",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Hast du gute Laune?",
            "Wie geht’s?",
            "Hallo, wie geht es dir?"
          ],
          "description": "Der Kunde fragt,  wie es dem Bot geht",
          "texts": [
            {
              "text": "Ich bin voller Energie und freue mich darauf getestet zu werden! 💪😊",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Wie kann ich weiterhelfen?",
          "intent": "how_can_i_help_you_now",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Nachfrage, wie geholfen werden kann, die nach Antworten des Bots angezeigt wird",
          "texts": [
            {
              "text": "Womit kann ich dir noch helfen?",
              "buttons": null
            },
            {
              "text": "Was möchtest du noch von mir wissen?",
              "buttons": null
            },
            {
              "text": "Wie kann ich dir noch behilflich sein?",
              "buttons": null
            },
            {
              "text": "Wie kann ich dir noch weiterhelfen?",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Willkommen",
          "intent": "welcome",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Chatbot begrüßt den Kunden und stellt sich vor.",
          "texts": [
            {
              "text": " Ich bin **##chatbotName##**, die digitale Assistentin der ##utilityName##. Ich beantworte dir gerne Fragen rund um das Thema **Energie und Wasser.**\n\nHier unten zeige ich dir ein paar Vorschläge bei denen ich dir besonders gut helfen kann 💪😊. Du kannst aber auch gerne deine Frage direkt hier im Chat eintippen.\n\n💡 Kleiner Tipp: Wenn du _**\"Menü\"**_ in den Chat schreibst gelangst du wieder zu dieser Themenauswahl.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Abschlag und Zahlungen",
                  "value": "Abschlag und Zahlungen",
                  "answer_config": 69061,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Energiemarkt aktuell",
                  "value": "Energiemarkt aktuell",
                  "answer_config": 69115,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Tarife und Produkte ",
                  "value": "Tarife und Produkte",
                  "answer_config": 69282,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Vertragsverwaltung",
                  "value": "Vertragsverwaltung",
                  "answer_config": 69113,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Zähler und Zählerstand",
                  "value": "Zähler und Zählerstand",
                  "answer_config": 69201,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Witz",
          "intent": "SM_joke",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich will was Witziges hören!",
            "Erzähle mir einen Witz!",
            "Kennst du Witze?"
          ],
          "description": "Der Kunde möchte einen Witz hören",
          "texts": [
            {
              "text": "Was macht man in Ostfriesland, wenn der Strom ausfällt? Man geht ins Watt und holt sich ein paar Kilo 🤣🤣🤣",
              "buttons": null
            },
            {
              "text": "Das Tolle an Energiesparlampen ist ja, dass es 30 Minuten dauert bis du weißt, ob ein Einbrecher oder deine Kinder vor dir stehen 😂😁😅",
              "buttons": null
            },
            {
              "text": "Wann ist die einzige Zeit, in der ein Mann an ein Abendessen bei Kerzenschein denkt? Wenn der Strom ausgefallen ist 😅😋😂",
              "buttons": null
            },
            {
              "text": "Ich bin mir sicher, dass ich dir zum Thema Strom und Gas viel mehr erzählen kann. 😉 Was möchtest du wissen?",
              "buttons": null
            },
            {
              "text": "Facebook: \"Ich kenne jeden!\"\n\nWikipedia: \"Ich weiß alles!\"\n\nGoogle: \"Ich finde alles!\"\n\nInternet: \"Ohne mich geht gar nichts!\"\n\nStrom: \"ACH WIRKLICH?\" 🤣🤣🤣",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Unklare Eingabe",
      "Intents": [
        {
          "name": "unklare Eingabe",
          "intent": "None",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Bot erkennt die Benutzereingabe nicht",
          "texts": [
            {
              "text": "Könnten Sie Ihre Frage etwas kürzer formulieren? Am besten verstehe ich\nEingaben, die nur Ihr zentrales Anliegen enthalten, z.B. “Zählerstand\nmitteilen” oder “Abschlag ändern”. 😊",
              "buttons": null
            },
            {
              "text": "Du kannst dich jederzeit bei uns melden.",
              "buttons": null
            },
            {
              "text": "Tut mir leid, hierbei kann ich dir gerade nicht helfen. Gerne kannst du Kontakt zu meinen menschlichen ##colleagueplural## aufnehmen. ",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt",
                  "value": "Kontakt",
                  "answer_config": 69304,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Ich bin mir nicht ganz sicher, was du meinst.\\\nAm besten kenne ich mich mit energiewirtschaftlichen Themen aus.💡\\\nÜber das *Menü* kannst du die wichtigsten Themen erkunden.😉 ",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü",
                  "value": "Menü",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Das habe ich leider nicht verstanden.\\\n Am besten verstehe ich dich, wenn du dein Anliegen **kurz** und **prägnant** formulierst, wie z.B. *“Zählerstand melden”*.😊 ",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2020-01-01T07:43:48.000Z"
        }
      ]
    },
    {
      "SkillName": "Telekommunikation",
      "Intents": [
        {
          "name": "Beratung TelKo",
          "intent": "telcoConsulting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Brauche Beratung zu Routern",
            "Haben Sie eine Rufnummer für eine Beratung zur Internettarif-Auswahl?",
            "Ich suche einen Berater, der mir bei der Auswahl des passenden Internettarifs hilft"
          ],
          "description": "Der Kunde benötigt spezielle Beratung rund um Telekommunikations-Themen.",
          "texts": [
            {
              "text": "Du benötigst **Beratung** zu deinem Internet-, Telefon- oder TV-Tarif bzw. damit verbundenen Rahmenbedingungen? Gerne stehen dir unsere fachkundigen Experten zur Seite.\n\nUm Kontakt aufzunehmen, sende uns einfach eine E-Mail an **[telko-support@sw-musterstadt.de](mailto:telko-support@sw-musterstadt.de)** 📩 oder melde dich telefonisch unter **0123 4567890** 📞.\n\nEinige hilfreiche Informationen findest du bereits hier. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Hinweise zur Geräteeinrichtung",
                  "value": "Hinweise zur Einrichtung der Internet- oder Telefongeräte",
                  "answer_config": 69392,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Tarife anzeigen",
                  "value": "Tarife für Internet, Telefon und TV anzeigen.",
                  "answer_config": 69342,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Terminvereinbarung Techniker",
                  "value": "Terminvereinbarung Techniker für Internet- oder Telefonprodukte",
                  "answer_config": 69393,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Versand der Geräte",
                  "value": "Versand der Internet- oder Telefongeräte",
                  "answer_config": 69391,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-27T13:08:11.000Z"
        },
        {
          "name": "Breitbandanschlüsse",
          "intent": "broadbandTypes",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Vergleich von Kabel, DSL und Glasfaser",
            "Was ist der Unterschied zwischen DSL und Kabel?",
            "Was ist ein Breitbandanschluss?"
          ],
          "description": "Der Kunde möchte mehr über die verschiedenen Breitbandanschlüsse (z. B. Glasfaser, DSL, Kabel etc.) erfahren.",
          "texts": [
            {
              "text": "Unter einem **Breitbandanschluss** versteht man einen **Internetzugang mit vergleichsweise hoher Datenübertragungsrate**.\n\nEs können **verschiedene Arten von Breitbandtechnologien** unterschieden werden. Zu den häufigsten Vertretern zählen die folgenden Anschlussarten:",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Datenübertragungsrate",
          "intent": "bitRate",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie schnell ist euer Internet?",
            "Was ist die Bitrate?",
            "Download- und Uploadgeschwindigkeiten anzeigen"
          ],
          "description": "Der Kunde möchte wissen, welche Datenübertragungsraten (Internetgeschwindigkeiten) zur Auswahl stehen bzw. am geeignetsten für ihn sind.",
          "texts": [
            {
              "text": "Wir bieten grundsätzlich verschiedene Anschlussarten an, die Datenübertragungsraten von **bis zu 1000 Mbit/s (Download) bzw. 500 Mbit/s (Upload)** erreichen können. \n\nWelcher Tarif für dich der richtige ist, hängt u. a. von deinen **Online-Aktivitäten** sowie von der **Anzahl der Geräte** ab, die auf den Internetanschluss zugreifen sollen.\n\nDarüber hinaus muss beachtet werden, dass noch nicht alle Regionen aufgrund des noch fortschreitenden **Glasfaser-Netzausbaus** von allen Geschwindigkeiten profitieren können.\n\nWeitere Informationen findest Du hier. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Internettarife anzeigen",
                  "value": "Internettarife anzeigen",
                  "answer_config": 69342,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Verfügbarkeit prüfen",
                  "value": "Internet-Verfügbarkeit prüfen",
                  "answer_config": 69181,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:34:34.000Z"
        },
        {
          "name": "DSL-Anschluss",
          "intent": "broadbandTypes",
          "entity": {
            "entityName": "broadbandType_L",
            "normalizedEntityValue": "DSL"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über den DSL-Anschluss erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Geräteinstallation Router",
          "intent": "telcoDeviceSetup",
          "entity": {
            "entityName": "telcoProduct_L",
            "normalizedEntityValue": "Internet"
          },
          "utterances": [
            "Hilfe bei der Intallation vom Internet-Router",
            "Ich weiß nicht, wo ich das Routerkabel reinstecken soll"
          ],
          "description": "Der Kunde benötigt Unterstützung beim Anschluss und der Installation seines Routers.",
          "newIntent": false,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Geräteinstallation Telefon",
          "intent": "telcoDeviceSetup",
          "entity": {
            "entityName": "telcoProduct_L",
            "normalizedEntityValue": "Telefon"
          },
          "utterances": [
            "Ich brauche Unterstützung bei der Einrichtung des Telefons"
          ],
          "description": "Der Kunde benötigt Unterstützung beim Anschluss und der Installation seines Telefons.",
          "newIntent": false,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Geräteinstallation TelKo allgemein",
          "intent": "telcoDeviceSetup",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde benötigt Unterstützung beim Anschluss und der Installation seiner TelKo-Geräte (z. B. Router oder Telefon).",
          "texts": [
            {
              "text": "Du benötigst Hilfe bei der **Einrichtung deines Gerätes**?\n\nZusammen mit dem Gerät selbst haben wir dir eine **Einrichtungs- und Bedienungsanleitung per Post** geschickt. Solltest du diese nicht mehr finden, kannst du sie alternativ auch **online abrufen**.\n\nFalls du darüber hinaus Unterstützung benötigst, wende dich gerne an unseren **Kundenservice**. Du erreichst uns unter 📞 0123 4567890 oder über unser 📩 Kontaktformular.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zu unseren Anleitungen ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Zum Kontaktformular",
                  "value": "Zum Kontaktformular",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Geräteversand TelKo",
          "intent": "telcoDeviceDelivery",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was kommt die neue Fritzbox bei mir an?",
            "Ist mein Telefon schon unterwegs?",
            "Bekomme ich den Router mit der Post?"
          ],
          "description": "Der Kunde möchte erfahren, ob bzw. wann die TelKo-Geräte (z. B. Router) an Ihn versendet werden.",
          "texts": [
            {
              "text": "Alle zu deinem Vertrag **zugehörigen Geräte** (High-Speed-Router und Festnetz-Telefon) versenden wir **ca. 14 Tage vor Vertragsbeginn** an deine angegebene Adresse.\n\nDu erhältst zeitgleich eine Benachrichtigung sowie einen **Link zur Sendungsverfolgung**.\n\nSofern sich deine gewünschte Versandadresse in der Zwischenzeit geändert haben sollte oder sonstige Probleme mit der Sendung vorliegen, wende Dich bitte an unseren **Kundenservice**.\n\n💡 Tipp: Deinen Vertragsbeginn findest du in den Unterlagen, die du zur Bestätigung per Post von uns erhalten hast.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-27T13:08:11.000Z"
        },
        {
          "name": "Geschwindkeitsprobleme",
          "intent": "internetPerformanceIssues",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Die Internetgeschwindigkeit ist nicht so hoch, wie angegeben",
            "Ich habe eine niedrigere Datenrate als vertraglich vereinbart",
            "Mein Internet ist viel zu langsam"
          ],
          "description": "Der Kunde bemängelt die zu niedrige Geschwindigkeit seiner Internetverbindung und sucht nach Tipps zur Optimierung.",
          "texts": [
            {
              "text": "Bei allen angegebenen Übertragungsraten handelt es sich um Idealwerte, die bei einer **Kabelverbindung zwischen Endgerät und Router** erreicht werden können.",
              "buttons": null
            },
            {
              "text": "Sofern Du mit deinem Gerät via **WLAN** (kabellose Verbindung) auf das Internet zugreifst, gibt es verschiedene **Einflussfaktoren**, welche die Geschwindigkeit verringern können. Hierzu zählen u. a.:\n- Anzahl der verbundenen Geräte\n- Datennutzung der verbundenen Geräte\n- Entfernung zwischen Router und Endgerät\n- Hindernisse zwischen Router und Endgerät (z. B. Wände oder Möbel)",
              "buttons": null
            },
            {
              "text": "Um eine möglichst hohe Geschwindigkeit zu erreichen, empfehlen wir dir, einen oder mehrere der genannten **Einflussfaktoren zu optimieren**. Alternativ kannst du die Übertragungsreichweite deines WLAN-Signals auch mithilfe eines **Repeaters** vergrößern.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Glasfaseranschluss",
          "intent": "broadbandTypes",
          "entity": {
            "entityName": "broadbandType_L",
            "normalizedEntityValue": "Glasfaser"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über den Glasfaseranschluss erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Glasfaserantrag",
          "intent": "registerForFibre",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte einen Glasfaseranschluss beantragen bzw. sich für den Ausbau des Glasfasernetzes in seiner Gemeinde registrieren.",
          "texts": [
            {
              "text": "Damit der **Glasfaserausbau** 🚧 auch in deiner Gemeinde erfolgen kann, müssen zunächst **mindestens 40 Prozent aller Einwohner** bis zum **Stichtag 22.12.2024** einen **Vorvertrag** mit unserem Glasfaserpartner unterzeichnen.\n\nFinden sich genügend Interessenten, wird der **Ausbau in der Regel innerhalb eines Jahres** umgesetzt – und du surfst bei Bedarf mit **superschnellem Internet**. ⚡\n\nDen aktuellen Stand zum Ausbau an deinem Wohnort findest du hier. 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Für Glasfaser anmelden ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Meinen Wohnort prüfen ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-08-29T14:56:23.000Z"
        },
        {
          "name": "Internetdrosselung",
          "intent": "internetThrotteling",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Gibt es ein begrenztes Datenvolumen?",
            "Handelt es sich beim Internettarif um eine Flatrate?",
            "Wird die Geschwindkeit irgendwann gedrosselt?"
          ],
          "description": "Der Kunde möchte wissen, ob und unter welchen Bedingungen sein Internettarif gedrosselt werden kann.",
          "texts": [
            {
              "text": "Bei unseren Internet-Tarifen handelt es sich ausnahmslos um **Flatrate-Tarife**. Das bedeutet, dass du grundsätzlich eine unbegrenzte Menge an Daten via Download oder Upload transferieren kannst. Deine Internetgeschwindigkeit ist dabei nicht von den bisher übermittelten Datenmengen abhängig.\n\nDennoch kann es vorkommen, dass die **Datenübertragsrate** (d. h. deine Internetgeschwindigkeit) **variiert**. Weitere Informationen dazu findest du hier. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Einflüsse auf die Geschwindigkeit",
                  "value": "Einflüsse auf die Internetgeschwindigkeit",
                  "answer_config": 69183,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Internetstörung",
          "intent": "internetConnectionIssues",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Das Internet bricht ständig ab",
            "Ich kann keine Internetverbindung herstellen",
            "Wo kann ich eine Internetstörung melden?"
          ],
          "description": "Der Kunde bemängelt eine Störung der Internetverbindung und benötigt Unterstützung.",
          "texts": [
            {
              "text": "Du benötigst Hilfe bei einer **Internetstörung** oder möchtest einen **Ausfall melden**?\n\nSofern die von dir beobachtete Störung bereits in unserer aktuellen **Störungsauskunft** aufgeführt ist, arbeiten wir bereits mit Hochdruck an einer Lösung und bitten dich noch um ein wenig Geduld.\n\nAlternativ wende dich gerne an unseren **Internet-Kundenservice**, damit wir dir bei deinem konkreten Fall weiterhelfen können. Du erreichst uns unter 📞 0123 4567890 oder über unser 📩 Kontaktformular.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Hilfe bei erstmaliger Einrichtung",
                  "value": "Hilfe bei erstmaliger Einrichtung des Routers",
                  "answer_config": 69392,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Zum Kontaktformular",
                  "value": "Zum Kontaktformular",
                  "answer_config": 69305,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zur Störungsauskunft ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Internetverfügbarkeit",
          "intent": "internetAvailability",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie steht es um den Glasfaserausbau in Musterstadt?",
            "Welche Internetanschlüsse bieten Sie in Musterstadt an?",
            "Ist an meinem Wohnort ein Glasfaseranschluss möglich?"
          ],
          "description": "Der Kunde möchte mehr über die Verfügbarkeit verschiedener Breitbandarten (z. B. Glasfaser) an seinem Wohnort erfahren.",
          "texts": [
            {
              "text": "In mehr und mehr Regionen Deutschlands schreitet der Ausbau der aktuell **übertragungsstärksten Breitbandtechnologie**, der **Glasfaser**, voran. Dennoch gibt es noch immer viele Wohngebiete, die aufgrund der dortigen Netzsituation noch keinen vollständigen Zugang dazu haben.\n\nWelche **Internettarife und Übertragungsraten** bei dir verfügbar sind, erfährst du am schnellsten über unsere **Verfügbarkeitsabfrage**. 👇",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zur Verfügbarkeitsabfrage ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Kabelanschluss",
          "intent": "broadbandTypes",
          "entity": {
            "entityName": "broadbandType_L",
            "normalizedEntityValue": "Kabel"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte mehr über den Kabelanschluss erfahren.",
          "newIntent": false,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        },
        {
          "name": "Kundeneigene Geräte TelKo",
          "intent": "telcoOwnDevices",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist in dem Paket auch ein Router enthalten?",
            "Ich möchte meine Fritzbox 7590 weiterhin nutzen und brauche keinen neuen Router",
            "Kann ich mein eigenes Telefongerät auch in Zukunft noch verwenden, wenn ich den Tarif abschließe?"
          ],
          "description": "Der Kunde möchte erfahren, ob er bei einem Vertragsabschluss anstatt des Zukaufs eines Gerätes (z. B. Router) auch weiterhin ein Gerät  nutzen kann, das bereits in seinem Besitz ist.",
          "texts": [
            {
              "text": "Grundsätzlich kannst du auch weiterhin deinen **eigenen Router verwenden**, sofern dieser die **an deinen Vertrag geknüpften Anforderungen** erfüllt. Wähle beim Vertragsabschluss hierfür einfach aus, dass du keinen Router über uns erwerben bzw. mieten möchtest.\n\nBitte beachte jedoch, dass insbesondere bei Glasfaser-Tarifen **bestimmte technische Voraussetzungen** erfüllt sein müssen, damit die vertraglich vereinbarte Leistung erbracht werden kann. Falls du dir unsicher bist, ob dein Router geeignet ist, verwende einfach unseren **Router-Check** oder nimm kostenlos Kontakt zu unserer **Internet-Fachberatung** auf. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Beratung zu Internetprodukten",
                  "value": "Beratung zu Internetprodukten",
                  "answer_config": 69390,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Zum Router-Check ↗",
                  "value": "https://stadtwerk.bot/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-27T13:08:11.000Z"
        },
        {
          "name": "Rufnummernmitnahme",
          "intent": "contactDataPorting",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte seine Rufnummer zum neuen Anbieter mitnehmen oder vom alten Anbieter hierher mitnehmen.",
          "texts": [
            {
              "text": "Die Rufnummernmitnahme kannst du bei deinem alten Telefonanbieter beantragen. Der Mitnahmeprozess kann je nach Anbieter variieren. In der Regel ist es möglich, die Mitnahme bis zu 123 Tage vor und 90 Tage nach dem Ende der Vertragslaufzeit beantragen.",
              "buttons": null
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2023-07-03T08:51:58.000Z"
        },
        {
          "name": "Tarife und Produkte TelKo",
          "intent": "SM_internet",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich benötige einen Internetanschluss. ",
            "Kann ich bei Ihnen auch einen Telefonvertrag abschließen?",
            "Welche Produkte bieten Sie im Bereich Internet, Telefon und TV an?"
          ],
          "description": "Der Kunde sucht Informationen zu Telekommunikationsprodukten (Internet, Telefon, TV).",
          "texts": [
            {
              "text": "Du hast Interesse oder Fragen zu Internet- und Breitbandangeboten? Schau doch bei unseren **Internetangeboten** vorbei!",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Unsere Internetangebote ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Technikertermin TelKo",
          "intent": "telcoInstallerAppointment",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie kann ich den Techniker erreichen, der mir den Router anschließt?",
            "Kann ich einen Installationsservice beauftragen?",
            "Ich brauche einen Techniker für meinen Internetanschluss"
          ],
          "description": "Der Kunde möchte einen Technikertermin zur Geräteinstallation vereinbaren oder Auskunft darüber, wann der Termin stattfindet.",
          "texts": [
            {
              "text": "Bei einem Vertragswechsel kann es vorkommen, dass wir deinen **Hausanschluss umstellen** müssen, um deinen Internet- oder Telefontarif zu aktivieren. In diesem Fall kümmert sich einer unserer **Techniker** 👷‍♂️ um alle notwendigen Schritte. \n\nWenige Tage vor Vertragsbeginn wirst du direkt von unserem Techniker kontaktiert, um einen **Termin zu vereinbaren**. 📞\n\nSofern Dein **Anschluss bereits für unsere Services freigeschaltet** ist, erhältst du keine gesonderte Benachrichtigung, sondern kannst deine Geräte nach Erhalt ganz einfach selbst anschließen und direkt loslegen.\n\nWeitere Tipps findest du hier. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Hinweise zur Geräteeinrichtung",
                  "value": "Hinweise zur Einrichtung der Internet- oder Telefongeräte",
                  "answer_config": 69392,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Versand der Geräte",
                  "value": "Versand der Internet- oder Telefongeräte",
                  "answer_config": 69391,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-27T13:08:11.000Z"
        },
        {
          "name": "Übersicht zu TelKo",
          "intent": "telcoOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Übersicht Internet",
            "Suche Hilfe zum Telefonanschluss",
            "Frage zum Internet"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Telekommunikation.",
          "texts": [
            {
              "text": "Du suchst Informationen rund um unsere Angebote im Bereich **Internet**, **Telefon** und **TV**? Wähle einfach eines der Themen aus oder gib deine eigene Frage unten im Chat ein.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Geräte-Setup und Installation",
                  "value": "Hilfe bei der Installation von Router, Telefon und co.",
                  "answer_config": 69392,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Glasfaser-Verfügbarkeit",
                  "value": "Ist an meinem Wohnort ein Glasfaseranschluss verfügbar?",
                  "answer_config": 69181,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Internetstörung melden",
                  "value": "Internetstörung melden",
                  "answer_config": 69182,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Produkte anzeigen",
                  "value": "Produkte im Bereich Internet, Telefon und TV",
                  "answer_config": 69342,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-26T11:48:00.000Z"
        }
      ]
    },
    {
      "SkillName": "Umzug",
      "Intents": [
        {
          "name": "Fristen für Umzugsmeldung",
          "intent": "MV_timeTillMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wieviel Zeit habe ich, um euch rechtzeitig über meinen Umzug zu informieren?",
            "Wie viele Tage vor meinem Umzug sollte ich euch Bescheid geben?",
            "Bis wann braucht ihr die Infos über meinen Umzug?"
          ],
          "description": "Der Kunde möchte eine Anzeige der Fristen für eine Umzugsmeldung",
          "texts": [
            {
              "text": "Deinen **Einzug** kannst du bei uns i.d.R. bis zu **4 Wochen rückwirkend** oder auch gerne vorher bis zu **2 Monate im Voraus** melden. \n\nDamit bei deinem Umzug nichts schiefgeht und wir dich pünktlich im neuen Zuhause mit Energie versorgen können, **melde uns deinen Umzug**, sobald du die **Schlüssel erhalten 🔑** bzw. übergeben hast.",
              "buttons": null
            },
            {
              "text": "Möchtest du deinen Umzug jetzt bei uns melden?",
              "buttons": null
            },
            {
              "text": "Alles klar 😊. Damit bei deinem Umzug nichts schiefgeht und wir dich pünktlich mit Strom und Erdgas im neuen Zuhause versorgen können, **melde uns deinen Umzug** sobald du die **Schlüssel erhalten 🔑** bzw. übergeben hast.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Kein Umzug",
          "intent": "MV_noMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde hat keinen geplanten Umzug.",
          "texts": [
            {
              "text": "Zu diesem Anliegen kann ich dir aktuell leider noch keine Auskunft geben. Einige Themen, bei denen ich dir weiterhelfen kann, sind im **Menü** zusammengestellt.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Menü aufrufen",
                  "value": "Menü aufrufen",
                  "answer_config": 69146,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Leerstandsmeldung",
          "intent": "MV_reportEmptyFlat",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was muss ich tun, wenn die Wohnung leer steht?",
            "Unsere Wohnung steht im Moment noch leer, was muss ich tun?",
            "Wer zahlt den Strom, wenn eine Wohnung momentan leer steht?"
          ],
          "description": "Der Kunde möchte einen Leerstand an-/abmelden",
          "texts": [
            {
              "text": "Du möchtest bei uns einen Leerstand an- oder abmelden? Kein Problem! ",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 2,
                  "title": "Leerstand abmelden ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Leerstand anmelden ↗",
                  "value": "https://stadtwerk.bot/portal/",
                  "answer_config": null,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Nachträgliche Umzugsmeldung",
          "intent": "MV_afterMovingInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich wohne nicht mehr in der alten Wohnung.",
            "Ich habe vergessen mich umzumelden.",
            "Ich habe vergessen meinen Umzug zu melden."
          ],
          "description": "Der Kunde will seinen Umzug melden, ist jedoch bereits umgezogen",
          "texts": [
            {
              "text": "Bist du bereits umgezogen und möchtest uns deinen **Umzug mitteilen**? ",
              "buttons": null
            },
            {
              "text": "Kein Problem!\\\nAber denk dran ☝: Erfolgt die **Anmeldung später als 6 Wochen** nach deinem Umzug und wurde bereits Energie bezogen, übernimmt der zuständige Grundversorger deine Versorgung.",
              "buttons": null
            },
            {
              "text": "Was du tun musst? Wir benötigen nur ein paar Angaben von dir: **Vertragsnummer und Kontaktinformationen** sowie deine neue und ggfs. auch alte Anschrift. Das war's schon 🙂",
              "buttons": null
            },
            {
              "text": "Du bist **bereits umgezogen**? Keine Sorge, deine Energieversorgung ist immer gesichert.\\\n\\\nSehr gerne versorgen wir dich auch in deinem **neuen Zuhause** 🏠.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Neuer Eigentümer/Mieter",
          "intent": "newHouseOwner",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Was muss ich beachten beim Mieterwechsel?",
            "Ich möchte einen Mieterwechsel in meiner Immobilie melden",
            "Ich bin jetzt Eigentümer eines Hauses, was muss ich machen?"
          ],
          "description": "Der Kunde meldet einen Eigentümer-/Mieterwechsel",
          "newIntent": false,
          "creationTimestamp": "2021-06-30T10:07:34.000Z"
        },
        {
          "name": "Stand der Umzugsmeldung",
          "intent": "movingStatus",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Haben Sie meine Ummeldung schon ihrem System?",
            "Ist die Ummeldung schon abgeschlossen?",
            "Wie ist der Bearbeitungsstand von meiner Umzugsmeldung?"
          ],
          "description": "Der Kunde sucht Informationen zum Stand seines Umzugs- bzw. Ummeldeantrags.",
          "texts": [
            {
              "text": "Sofern du Fragen zum **aktuellen Stand deiner Umzugsmeldung** hast, nimm gerne Kontakt zu unserem Kundenservice auf.",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Kontakt aufnehmen",
                  "value": "Kontakt aufnehmen",
                  "answer_config": 69305,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-05-20T08:35:40.000Z"
        },
        {
          "name": "Übersicht zu Umzug",
          "intent": "movingOverview",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Umzug",
            "Ich suche Informationen zum Umzug",
            "Ich habe eine Frage zum Umzug"
          ],
          "description": "Der Kunde erhält eine Übersicht zu häufigen Fragen und Themen im Bereich Umzug.",
          "texts": [
            {
              "text": "Du suchst Informationen zum Themenbereich **Umzug**?\n \n Wähle einfach eine der Optionen aus oder gib unten eine andere Frage ein. 👇",
              "buttons": [
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Fristen zur Umzugsmeldung",
                  "value": "Fristen zur Umzugsmeldung",
                  "answer_config": 69243,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 1,
                  "title": "Umzug jetzt melden",
                  "value": "Umzug jetzt melden",
                  "answer_config": 69239,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 4,
                  "title": "Versorgungsgebiete prüfen",
                  "value": "Versorgungsgebiete prüfen",
                  "answer_config": 69272,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 5,
                  "title": "Vertragskündigung bei Umzug",
                  "value": "Vertragskündigung bei Umzug",
                  "answer_config": 69235,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 3,
                  "title": "Vertragsmitnahme",
                  "value": "Vertragsmitnahme beim Umzug",
                  "answer_config": 69236,
                  "identificator": null
                }
              ]
            }
          ],
          "newIntent": true,
          "creationTimestamp": "2022-07-15T08:09:02.000Z"
        },
        {
          "name": "Umzug",
          "intent": "MV_executeMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            null
          ],
          "description": "Der Kunde möchte seinen Umzug durchführen",
          "texts": [
            {
              "text": "Möchtest du uns jetzt deinen Zählerstand mitteilen?",
              "buttons": null
            },
            {
              "text": "Einzug melden",
              "buttons": null
            },
            {
              "text": "Bestehenden Tarif mitnehmen",
              "buttons": null
            },
            {
              "text": "Auszugsdatum",
              "buttons": null
            },
            {
              "text": "Telefonnummer",
              "buttons": null
            },
            {
              "text": "E-Mail",
              "buttons": null
            },
            {
              "text": "Zählernummer",
              "buttons": null
            },
            {
              "text": "Einzugsdatum",
              "buttons": null
            },
            {
              "text": "Zum Tarifrechner",
              "buttons": null
            },
            {
              "text": "Zählernummer",
              "buttons": null
            },
            {
              "text": "z.B. ES1207445544",
              "buttons": null
            },
            {
              "text": "Vor- und Nachname",
              "buttons": null
            },
            {
              "text": "Straßenname",
              "buttons": null
            },
            {
              "text": "Ort",
              "buttons": null
            },
            {
              "text": "Postleitzahl",
              "buttons": null
            },
            {
              "text": "Hausnummer",
              "buttons": null
            },
            {
              "text": "Vertragsnummer",
              "buttons": null
            },
            {
              "text": "Möchtest du dir deinen persönlichen Tarif berechnen lassen oder mir hier direkt deinen Einzug mitteilen?",
              "buttons": null
            },
            {
              "text": "Bist du bereits ##customer## bei uns?",
              "buttons": null
            },
            {
              "text": "Einzugsdatum",
              "buttons": null
            },
            {
              "text": "z.B. 00-12345",
              "buttons": null
            },
            {
              "text": "Alles klar. Um deinen Umzug zu bearbeiten, benötige ich **einige Angaben** von dir.",
              "buttons": null
            },
            {
              "text": "Bitte denk daran ☝, Zählernummer und Zählerstand zum Tag des Einzugs nachzureichen.",
              "buttons": null
            },
            {
              "text": "Fast geschafft! Bitte nenne mir deine **alte Adresse** und **Auszugsdatum**.",
              "buttons": null
            },
            {
              "text": "Fast geschafft 🤗! Bitte nenne mir deine **neue Adresse** und **Einzugsdatum**.",
              "buttons": null
            },
            {
              "text": "Bitte teile mir zum Schluss noch mit, **wo** du hinziehst 👇",
              "buttons": null
            },
            {
              "text": "Bitte denk daran ☝,**Zählernummer** und **Zählerstand** zum Tag des Auszugs nachzureichen. Damit erstellen wir deine **Schlussrechnung**, die wir an deine neue Adresse schicken.",
              "buttons": null
            },
            {
              "text": "Vielen Dank für deine Mitteilung! Deine Daten wurden erfasst ✅ und werden jetzt von meinen menschlichen ##colleagueplural## weiter bearbeitet.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Umzugsinformationen fehlen",
          "intent": "MV_absentInfoForMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich habe nicht alle Informationen für den Umzug.",
            "Ich habe bisher keinen Nachmieter.",
            "Es ist noch kein genaues Umzugsdatum bekannt."
          ],
          "description": "Der Kunde will seinen Umzug melden, hat aber nicht alle benötigten Daten parat",
          "texts": [
            {
              "text": "Fehlende Informationen kannst du auch problemlos nachreichen. Reich sie am besten ein, nachdem du die Schlüssel erhalten bzw. übergeben hast.",
              "buttons": null
            },
            {
              "text": "Du hast nicht alle Informationen für deinen Umzug vorliegen? Kein Problem, wir können deinen Umzug trotzdem vormerken.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Umzugsmitteilung",
          "intent": "MV_generalMovingInfo",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Wie funktioniert die Umzugsmeldung?",
            "Muss ich euch Daten übermitteln, wenn ich umziehe?",
            "Ich möchte meinen Umzug melden."
          ],
          "description": "Der Kunde möchte seinen Umzug melden",
          "texts": [
            {
              "text": "Alles klar. Damit bei deinem Umzug nichts schiefgeht und wir dich pünktlich mit Strom und Erdgas im neuen Zuhause versorgen können, **melde uns deinen Umzug** sobald du die **Schlüssel erhalten 🔑** bzw. übergeben hast.",
              "buttons": null
            },
            {
              "text": "Möchtest du deinen Umzug jetzt bei uns melden? ",
              "buttons": null
            },
            {
              "text": "Was du tun musst? Wir benötigen nur ein paar Angaben von dir: **Vertragsnummer** und **Kontaktinformationen** sowie deine neue und ggfs. auch **alte Adresse**. Das war's schon 🙂",
              "buttons": null
            },
            {
              "text": "Du ziehst um? 🚚\n\nWir freuen uns, wenn du auch in deinem neuen Zuhause unser ##customer## bleibst. Wenn du **innerhalb unseres Vertriebsgebietes** wohnen bleibst, beliefern wir dich gerne weiterhin mit Strom und Gas.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertrag bei Umzug beibehalten",
          "intent": "MV_continueContractAfterMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ist eine Weiterbelieferung mit Strom nach dem Auszug noch möglich?",
            "Kann ich meinen alten Stromvertrag beim Umzug mitnehmen?",
            "Kann ich meinen Tarif zu euch mitnehmen?"
          ],
          "description": "Der Kunde möchte seinen Vertrag nach seinem Umzug behalten",
          "texts": [
            {
              "text": "Sehr gerne versorgen wir dich auch in deinem **neuen Zuhause mit Energie** ⚡! Wenn du innerhalb unseres Versorgungsgebietes wohnen bleibst, sind wir gerne weiterhin für dich da 😊.",
              "buttons": null
            },
            {
              "text": "Möchtest du deinen Vertrag mitnehmen? 👇\n\n**Vertrag mitnehmen** \\\nPrüfe in unserem Tarifrechner, ob wir dich in deinem neuen Zuhause auch versorgen können!\n\n**Umzug direkt melden** \\\nWenn wir dich auch in deinem neuen Zuhause versorgen können, melde deinen Umzug direkt hier.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Neue Adresse prüfen ↗",
                  "value": "https://stadtwerk.bot/tarifrechner/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Umzug melden",
                  "value": "Umzug melden",
                  "answer_config": 69239,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Damit wir dich pünktlich mit Strom und Erdgas im neuen Zuhause versorgen können, **melde uns deinen Umzug**, sobald du die **Schlüssel 🔑 erhalten** bzw. übergeben hast.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Vertragskündigung bei Umzug",
          "intent": "MV_cancelContractWhenMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Ich ziehe um und will meinen Zähler abmelden.",
            "Ich ziehe um und möchte meinen Zähler abmelden.",
            "Ich ziehe aus meiner jetzigen Wohnung aus und möchte meinen Vertrag kündigen."
          ],
          "description": "Der Kunde möchte die Kündigung des Vertrags nach einem Umzug",
          "texts": [
            {
              "text": "Möchtest du deinen Vertrag mitnehmen? 👇\n\n**Vertrag mitnehmen** \\\nPrüfe in unserem Tarifrechner, ob wir dich in deinem neuen Zuhause auch versorgen können!\n\n**Umzug direkt melden** \\\nWenn wir dich auch in deinem neuen Zuhause versorgen können, melde deinen Umzug direkt hier.",
              "buttons": [
                {
                  "type": "openUrl",
                  "order": 1,
                  "title": "Neue Adresse prüfen ↗",
                  "value": "https://stadtwerk.bot/tarifrechner/",
                  "answer_config": null,
                  "identificator": null
                },
                {
                  "type": "messageBack",
                  "order": 2,
                  "title": "Umzug melden",
                  "value": "Umzug melden",
                  "answer_config": 69239,
                  "identificator": null
                }
              ]
            },
            {
              "text": "Wenn du **innerhalb unseres Versorgungsgebietes** umziehst, bieten wir dir die Möglichkeit an, deinen **Vertrag mitzunehmen**. Sehr gerne versorgen wir dich auch in deinem neuen Zuhause mit Energie ⚡!",
              "buttons": null
            },
            {
              "text": "Damit wir dich pünktlich mit Strom und Erdgas im neuen Zuhause versorgen können, **melde uns deinen Umzug**, sobald du die **Schlüssel erhalten** 🔑 bzw. übergeben hast.",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        },
        {
          "name": "Warum man Umzug melden sollte",
          "intent": "MV_whyTellMoving",
          "entity": {
            "entityName": "noneEntity",
            "normalizedEntityValue": "noneNormalizedValue"
          },
          "utterances": [
            "Muss ich mich wirklich abmelden, wenn ich wegziehe?",
            "Muss ich euch meine neue Adresse mitteilen?",
            "Für welchen Zweck benötigt ihr meine Umzugsdaten?"
          ],
          "description": "Der Kunde möchte wissen, warum man einen Umzug melden soll",
          "texts": [
            {
              "text": "Wenn du dich **frühzeitig** um den Umzug deiner Energie kümmerst, vermeidest du unnötigen Stress und hast mehr Zeit für andere Angelegenheiten 😊.",
              "buttons": null
            },
            {
              "text": "Wenn du deinen **Umzug nicht anmeldest**, übernimmt der zuständige **Grundversorger** deine Versorgung. Da der Tarif des Grundversorgers in der Regel **teuer** ist ☝, kannst du sogar **bares Geld sparen**, wenn du uns deinen Umzug rechtzeitig mitteilst!",
              "buttons": null
            }
          ],
          "newIntent": false,
          "creationTimestamp": "2021-06-10T07:43:48.000Z"
        }
      ]
    }
  ]
  return res
}
/**
 * A button as it is described in the database
 * @typedef {{ type: string, title: string, value: string, identificator: string, order: number}} Button
 */
/**
 * The configuration informations of an answer as described in the database
 * @typedef {{ type: string, redirectToVirtualIntentName: string}} AnswerConfig
 */
/**
 * All informations concerning an answer.
 * @typedef {Object} Answer
 * @property {string} id - answer id
 * @property {string} text - text for answer
 * @property {string} readableName - human readable name of intent
 * @property {string} description - description of this perticular answer
 * @property {Button[]} buttons - buttons mapped to this answer
 */
/**
 * @typedef {{ answers: Answer[], answerConfig: AnswerConfig}} AnswerInfo
 */
/**
 * @param {string} virtualIntentName human readable name for a particular intent
 * @returns {AnswerInfo} an information object containing all the information for an intent
 */
export function getAnswersforIntent(virtualIntentName) {
  return request({
    url: authorizedBackendUrl + 'answers',
    /**
     * we have to use post request here:
     * if we use get, data in body will be ignored
     */
    method: 'post',
    data: { virtualIntentName },
  })
}

export function setAnswerText(answerId, text) {
  return request({
    url: authorizedBackendUrl + 'setAnswerText',
    method: 'post',
    data: { answerId, text },
  })
}
/**
 * Sends the post request to the BE to save the new button properties
 * to the button with the specified original title and answer id.
 * @param answerId is the id of the answer which contains the current button.
 * @param originalButtonTitle is the original title of the button, which is used to identify
 * the current button together with the answer ID in DB table answer_buttons
 * @param newButtonTitle is the new title of the current button
 * which has to be saved in the DB table answer_buttons
 * @param newButtonType is the new type of the current button
 * which has to be saved in the DB table answer_buttons
 * @param newButtonValue is the new value of the current button
 * which has to be saved in the DB table answer_buttons
 * @param newButtonOrder is the new order of the current button
 */
export function setButtonProperties(
  answerId,
  originalButtonTitle,
  newButtonTitle,
  newButtonType,
  newButtonValue,
  newButtonVirtualIntent,
  newButtonOrder
) {
  return request({
    url: authorizedBackendUrl + 'setButtonProperties',
    method: 'post',
    data: {
      answerId,
      originalButtonTitle,
      newButtonTitle,
      newButtonType,
      newButtonValue,
      newButtonVirtualIntent,
      newButtonOrder
    },
  })
}
