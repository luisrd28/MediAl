"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button} from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Link } from "@heroui/link";
import { motion, AnimatePresence } from "framer-motion";

// A simple implementation of useDisclosure.
// If your UI library provides one, you can import it instead.
function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);
  return { isOpen, onOpen, onClose, onOpenChange };
}

export default function Home() {
  // Navigation history: starting at Card 1.
  const [history, setHistory] = useState([1]);
  const currentCard = history[history.length - 1];
  // Direction: 1 for forward, -1 for backward.
  const [direction, setDirection] = useState(1);

  // Navigation functions:
  const navigateTo = (card: number) => {
    setDirection(1);
    setHistory([...history, card]);
  };

  // For cards where the "Back" button should truly go to the previous card in history.
  const goBack = () => {
    if (history.length > 1) {
      setDirection(-1);
      setHistory(history.slice(0, history.length - 1));
    }
  };

  // For "Restart" always go back to Card 1.
  const restart = () => {
    setDirection(1);
    setHistory([1]);
  };

  // -------------------- CARD COMPONENTS --------------------

  // Card 1: Welcome/Definition
  const Card1 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">
          Convulsive Status Epilepticus: Management
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="font-bold">Definitions</p>
        <ul className="list-disc ml-5">
          <li>
            Unremitting generalized convulsive seizure lasting longer than 5
            minutes.
          </li>
          <li>
            Multiple bilateral convulsive seizures without an interictal return
            to baseline LOC.
          </li>
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full flex justify-center">
          <Button color="primary" onPress={() => navigateTo(2)}>Begin</Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Card 2: Immediate Management (focused history)
  const Card2 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">Immediate Management</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="font-bold text-red-500">
          These steps should be performed simultaneously with the administration
          of the first dose of benzodiazepine.
        </p>
        <p className="font-bold mt-4">Obtain focused history.</p>
        <ul className="list-disc ml-5">
          <li>
            Prehospital administration of benzodiazepines and any antiseizure
            medication (ASM).
          </li>
          <li>Hx of epilepsy.</li>
          <li>
            Presence of acute illness, toxic exposure, trauma, recent heavy
            alcohol intake or cessation of chronic drinking, change in antiseizure
            medication.
          </li>
          <li>Current medications.</li>
          <li>Prior status epilepticus, history of treatment response.</li>
          <li> Evaluate Airway, Breathing, and Circulation.
          <li>Look for signs of trauma, sepsis, anisocoria or meningitis.</li>
          </li>
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onPress={goBack}>Back</Button>
          <Button color="primary" onPress={() => navigateTo(3)}>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Card 3: Immediate Management (resuscitation steps with modals)
  const Card3 = () => {
    const airwayModal = useDisclosure();
    const glucoseModal = useDisclosure();

    return (
      <>
        <Card className="max-w-[400px] mx-auto">
          <CardHeader>
            <h2 className="text-lg font-bold">Immediate Management</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="font-bold text-red-500">
              These steps should be performed simultaneously with the administration
              of the first dose of benzodiazepine.
            </p>
            <ul className="list-disc ml-5 mt-4">
              <li>
                Stabilize and support{" "}
                <Link onPress={airwayModal.onOpen} className="underline">
                  airway
                </Link>{" "}
                and breathing → provide 100% oxygen.
              </li>
              <li>Cardiorespiratory monitors and pulse oximetry.</li>
              <li>Establish IV or IO access (at least two lines).</li>
              <li>
                Labs: electrolytes,{" "}
                <Link onPress={glucoseModal.onOpen} className="underline">
                  glucose
                </Link>
                , Ca, Mg, LFTs, CBC, toxicology, and ASM levels.
              </li>
            </ul>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button onPress={goBack}>Back</Button>
              <Button color="primary" onPress={() => navigateTo(4)}>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Modal for "airway" */}
        <Modal isOpen={airwayModal.isOpen} onOpenChange={airwayModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  Indications for Rapid Sequence Intubation
                </ModalHeader>
                <ModalBody>
                  <ol className="list-decimal ml-5">
                    <li>Unprotected or unmaintanable airway.</li>
                    <li>Apnea or inadequate ventilation.</li>
                    <li>Hypoxemia.</li>
                    <li>Status epilepticus lasting ≥ 30 min.</li>
                    <li>
                      Need to protect the airway for urgent brain imaging.
                    </li>
                  </ol>
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-end">
                    <Button color="primary" onPress={onClose}>
                      Close
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal for "glucose" */}
        <Modal isOpen={glucoseModal.isOpen} onOpenChange={glucoseModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Correct Hypoglycemia</ModalHeader>
                <ModalBody>
                  <ul className="list-disc ml-5">
                    <li>
                      Administer 100 mg of thiamine and 50 mL of 50% dextrose solution.
                    </li>
                    <li>
                      If IV access not available, IM glucagon or IO 50% dextrose solution.
                    </li>
                  </ul>
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-end">
                    <Button color="primary" onPress={onClose}>
                      Close
                    </Button>
                  </div>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  // Card 4: Drugs Administration with separate Dosage Modals for BZD and ASM
const Card4 = () => {
  const dosageBZDModal = useDisclosure();
  const dosageASMModal = useDisclosure();

  return (
    <>
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <h2 className="text-lg font-bold">Drugs administration</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div>
            <p className="font-bold">IV/IO access available</p>
            <ul className="list-disc ml-5">
              <li>
                Administer first dose of a benzodiazepine (lorazepam or diazepam) in one access line.
              </li>
              <li>
                Administer first dose of ASM (levatiracetam, fosphenytoin, or valproate) in other access line.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-bold">IV/IO access not available</p>
            <ul className="list-disc ml-5">
              <li>
                Midazolam (IM, buccal, or intranasal) or rectal diazepam.
              </li>
              <li>Establish IV/IO access.</li>
              <li>
                First dose of ASM once IV/IO access available.
              </li>
            </ul>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            <Button color="primary" variant="flat" onPress={dosageBZDModal.onOpen}>Dosage BZD</Button>
            <Button color="primary" variant="flat" onPress={dosageASMModal.onOpen}>Dosage ASM</Button>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-between w-full">
            <Button onPress={goBack}>Back</Button>
            <Button color="success" onPress={() => navigateTo(5)}>
              Seizure stops
            </Button>
            <Button color="danger" onPress={() => navigateTo(6)}>
              Seizure continues
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Dosage BZD Modal */}
      <Modal isOpen={dosageBZDModal.isOpen} onOpenChange={dosageBZDModal.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Dosage BZD</ModalHeader>
              <ModalBody>
                <ul className="list-disc ml-5">
                  <li>
                    <span className="font-bold">IV Lorazepam</span>
                    <br />- 0.1 mg/kg at a max rate of 2 mg/min, alternatively 4 mg IV fixed dose, repeated if still seizing.
                  </li>
                  <li>
                    <span className="font-bold">IV Diazepam</span>
                    <br />- 0.15 mg/kg IV, up to 10 mg per dose, max rate 5 mg/min.
                  </li>
                  <li>
                    <span className="font-bold">Midazolam</span>
                    <br />- IM: 10 mg or 0.2 mg/kg.
                    <br />- Buccal: 10 mg.
                    <br />- Intranasal: one spray (5 mg) in each nostril to give 10 mg.
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-end">
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Dosage ASM Modal */}
      <Modal isOpen={dosageASMModal.isOpen} onOpenChange={dosageASMModal.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Dosage ASM</ModalHeader>
              <ModalBody>
                <ul className="list-disc ml-5">
                  <li>
                    <span className="font-bold">Levetiracetam</span>
                    <br />- 60 mg/kg IV/IO over 5 to 15 min (max 4500 mg).
                  </li>
                  <li>
                    <span className="font-bold">Phenytoin</span>
                    <br />- 20 mg/kg IV infused at 25-50 mg/min.
                    <br />- Additional dose of 5-10 mg/kg can be given 10 min after the loading infusion if seizures persist, up to a maximum cumulative dose of 30 mg/kg.
                  </li>
                  <li>
                    <span className="font-bold">Fosphenytoin</span>
                    <br />- 20 mg PE/kg IV infused at 100-150 mg/min.
                    <br />- Additional dose of 5-10 mg PE/kg can be given 10 min after the loading infusion if seizures persist, up to a maximum cumulative dose of 30 mg/kg.
                  </li>
                  <li>
                    <span className="font-bold">Valproate</span>
                    <br />- 40 mg/kg IV/IO at 10 mg/kg per minute.
                  </li>
                </ul>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-end">
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};


  // Card 5: Postictal Recovery (Back returns to previous history)
  const Card5 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">Postictal recovery</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="list-disc ml-5">
          <li>Continue cardiorespiratory monitoring.</li>
          <li>Complete neurologic assessment.</li>
          <li>
            If patient remains unresponsive after 20-30 min of optimal medical therapy, get continuous EEG monitoring to assess for NCSE, also consider sedation due to benzodiazepine effects as the reason for unresponsiveness.
          </li>
          <li>Additional diagnostic evaluation as needed.</li>
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onPress={goBack}>Back</Button>
          <Button color="primary" onPress={restart}>Restart</Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Card 6: Seizure continues after 5-10 min
  // Note: Here the Back button explicitly goes to Card 4.
  const Card6 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">
          Seizure continues after 5-10 min
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="text-left">
          If seizure continues despite appropriate medical therapy at 5-10 min give second dose of a benzodiazepine.
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onPress={() => navigateTo(4)}>Back</Button>
          <Button color="success" onPress={() => navigateTo(5)}>Seizure stops</Button>
          <Button color="danger" onPress={() => navigateTo(7)}>
            Seizure continues
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Card 7: Seizure continues after 15 min
  // "Back" here goes to Card 6.
  const Card7 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">
          Seizure continues after 15 min
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="list-disc ml-5 text-left">
          <li>Emergency neurology consultation.</li>
          <li>
            If fosphenytoin given previously, give additional dose, if not, administer an antiseizure medication not previously used.
          </li>
          <li>
            Prepare for transfer to ICU and potential need for rapid sequence intubation and mechanical ventilation.
          </li>
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onPress={() => navigateTo(6)}>Back</Button>
          <Button color="success"onPress={() => navigateTo(5)}>Seizure stops</Button>
          <Button color="danger" onPress={() => navigateTo(8)}>
            Seizure continues
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Card 8: Seizure continues after 30 min
  // "Back" explicitly goes to Card 7.
  const Card8 = () => (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-lg font-bold">
          Seizure continues after 30 min
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="list-disc ml-5 text-left">
          <li>Perform RSI and start mechanical ventilation.</li>
          <li>Continuous EEG monitoring.</li>
          <li>
            Start continuous infusion with midazolam, propofol, or pentobarbital.
          </li>
          <li>Maintain therapeutic levels of antiseizure medication.</li>
          <li>
            Titrate infusion to electroclinical seizure suppression for 24 to 48 hours.
          </li>
        </ul>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button onPress={() => navigateTo(7)}>Back</Button>
          <Button color="primary" onPress={restart}>Restart</Button>
        </div>
      </CardFooter>
    </Card>
  );

  // Render the current card based on state.
  const renderCard = () => {
    switch (currentCard) {
      case 1:
        return <Card1 />;
      case 2:
        return <Card2 />;
      case 3:
        return <Card3 />;
      case 4:
        return <Card4 />;
      case 5:
        return <Card5 />;
      case 6:
        return <Card6 />;
      case 7:
        return <Card7 />;
      case 8:
        return <Card8 />;
      default:
        return <Card1 />;
    }
  };

  // ------------- Sliding Animation Variants -------------
  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentCard}
          custom={direction}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderCard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
