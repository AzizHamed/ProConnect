import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Colors, View, Wizard, WizardStepStates } from 'react-native-ui-lib';
import BackgroundView from '../Layout/BackgroundView';
import ProButton from './ProButton';

interface ProWizardProps {
    control: Control;
    steps: React.ReactNode[];
    stepLabels: string[];
    onActiveIndexChanged?: (index: number) => void;
    onSubmit: () => void;
    onNext: () => void;
}

const ProWizard: React.FC<ProWizardProps> = ({ control, steps, stepLabels, onActiveIndexChanged, onNext, onSubmit }) => {
    const [maxIndex, setMaxIndex] = React.useState(0);

    const getState = (index: number, activeIndex: number): WizardStepStates => {
        if (index > maxIndex) {
            return WizardStepStates.DISABLED;
        } else if (index === activeIndex || index <= maxIndex) {
            return WizardStepStates.ENABLED;
        } else if (index < activeIndex) {
            return WizardStepStates.COMPLETED;
        }
        return WizardStepStates.DISABLED;
    }
    const isLastStep = (index: number) => {
        return index + 1 == steps.length;
    }

    return (
        <BackgroundView children={(

            <Controller
                control={control}
                defaultValue={0}
                name="activeIndex"
                render={({ field: { onChange, value } }) => (
                    <View height={"100%"}>
                        <Wizard containerStyle={{ backgroundColor: 'transparent' }} activeIndex={value} onActiveIndexChanged={(index) => {
                            setMaxIndex(index > maxIndex ? index : maxIndex);
                            // console.log('On Change Active index:', index);
                            // console.log('On Change Max index:', maxIndex);
                            onChange(index);
                            onActiveIndexChanged?.(index);
                        }}>

                            {stepLabels.map((label, index) => (
                                <Wizard.Step key={index} label={label} state={getState(index, value)}
                                    circleBackgroundColor={Colors.controlBackground} circleColor='transparent' color={Colors.controlText}
                                    circleSize={30} connectorStyle={{ height: 2, backgroundColor: Colors.controlText, borderWidth: 0 }} />
                            ))}
                        </Wizard>

                        <View marginT-20 center>

                            {steps[value]}
                            <ProButton text={isLastStep(value) ? 'Submit' : 'Next'} onPress={isLastStep(value) ? onSubmit : onNext} marginB-30 />

                        </View>
                    </View>
                )}
            />
        )}
        />);
}

export default ProWizard;