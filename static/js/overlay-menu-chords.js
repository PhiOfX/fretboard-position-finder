document.addEventListener("DOMContentLoaded", function() {
    const overlayToggleChords = document.getElementById('overlayToggleChords');
    const overlayMenuChords = document.getElementById('overlayMenuChords');
    const closeOverlayChords = document.getElementById('closeOverlayChords');

    const initialStepChords = document.getElementById('initialStepChords');
    const rootStepChords = document.getElementById('rootStepChords');
    const typeStepChords = document.getElementById('typeStepChords');
    const chordStep = document.getElementById('chordStep');
    const noteRangeStep = document.getElementById('noteRangeStep');
    const positionStepChords = document.getElementById('positionStepChords');

    const selectRootNoteChords = document.getElementById('selectRootNoteChords');
    const selectTypeChords = document.getElementById('selectTypeChords');
    const selectChord = document.getElementById('selectChord');
    const selectNoteRange = document.getElementById('selectNoteRange');
    const selectPositionChords = document.getElementById('selectPositionChords');

    const backToInitialFromRootChords = document.getElementById('backToInitialFromRootChords');
    const backToInitialFromTypeChords = document.getElementById('backToInitialFromTypeChords');
    const backToInitialFromChord = document.getElementById('backToInitialFromChord');
    const backToInitialFromNoteRange = document.getElementById('backToInitialFromNoteRange');
    const backToInitialFromPositionChords = document.getElementById('backToInitialFromPositionChords');

    // Default URL parameters
    let urlParams = {
        models_select: '3',
        root: '6',
        type_options_select: 'Triads',
        chords_options_select: 'Major',
        note_range: 'e - g',
        position_select: 'Basic Position'
    };

    // Ensure the overlay menu is hidden initially
    overlayMenuChords.style.display = 'none';

    overlayToggleChords.addEventListener('click', function() {
        console.log('Overlay toggle clicked');  // Debugging message
        overlayMenuChords.style.display = 'flex';
        initialStepChords.classList.add('active');
    });

    closeOverlayChords.addEventListener('click', function() {
        console.log('Close overlay clicked');  // Debugging message
        overlayMenuChords.style.display = 'none';
        resetStepsChords();
    });

    selectRootNoteChords.addEventListener('click', function() {
        console.log('Select Root Note clicked');  // Debugging message
        initialStepChords.classList.remove('active');
        rootStepChords.classList.add('active');
    });

    selectTypeChords.addEventListener('click', function() {
        console.log('Select Type clicked');  // Debugging message
        initialStepChords.classList.remove('active');
        typeStepChords.classList.add('active');
    });

    selectChord.addEventListener('click', function() {
        console.log('Select Chord clicked');  // Debugging message
        initialStepChords.classList.remove('active');
        chordStep.classList.add('active');
    });

    selectNoteRange.addEventListener('click', function() {
        console.log('Select Note Range clicked');  // Debugging message
        initialStepChords.classList.remove('active');
        noteRangeStep.classList.add('active');
    });

    selectPositionChords.addEventListener('click', function() {
        console.log('Select Position clicked');  // Debugging message
        initialStepChords.classList.remove('active');
        positionStepChords.classList.add('active');
    });

    backToInitialFromRootChords.addEventListener('click', function() {
        console.log('Back to Initial from Root clicked');  // Debugging message
        rootStepChords.classList.remove('active');
        initialStepChords.classList.add('active');
    });

    backToInitialFromTypeChords.addEventListener('click', function() {
        console.log('Back to Initial from Type clicked');  // Debugging message
        typeStepChords.classList.remove('active');
        initialStepChords.classList.add('active');
    });

    backToInitialFromChord.addEventListener('click', function() {
        console.log('Back to Initial from Chord clicked');  // Debugging message
        chordStep.classList.remove('active');
        initialStepChords.classList.add('active');
    });

    backToInitialFromNoteRange.addEventListener('click', function() {
        console.log('Back to Initial from Note Range clicked');  // Debugging message
        noteRangeStep.classList.remove('active');
        initialStepChords.classList.add('active');
    });

    backToInitialFromPositionChords.addEventListener('click', function() {
        console.log('Back to Initial from Position clicked');  // Debugging message
        positionStepChords.classList.remove('active');
        initialStepChords.classList.add('active');
    });

    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const step = this.closest('.step').id;
            console.log(`Grid item clicked: value=${value}, step=${step}`);  // Debugging message

            if (step === 'rootStepChords') {
                urlParams.root = value;
            } else if (step === 'typeStepChords') {
                urlParams.type_options_select = value;
            } else if (step === 'chordStep') {
                urlParams.chords_options_select = value;
            } else if (step === 'noteRangeStep') {
                urlParams.note_range = value;
            } else if (step === 'positionStepChords') {
                urlParams.position_select = value;
            }

            submitFormChords();
        });
    });

    function submitFormChords() {
        console.log('Submitting form with params:', urlParams);  // Debugging message
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = '';

        const queryParams = new URLSearchParams();
        for (const key in urlParams) {
            const originalValue = urlParams[key];
            console.log(`Key: ${key}, Original Value: ${originalValue}`);  // Debugging message
            queryParams.append(key, originalValue);
        }

        const formAction = form.action + '?' + queryParams.toString();
        console.log(`Form action: ${formAction}`);  // Debugging message

        window.location.href = formAction;
    }

    function resetStepsChords() {
        console.log('Resetting steps');  // Debugging message
        initialStepChords.classList.remove('active');
        rootStepChords.classList.remove('active');
        typeStepChords.classList.remove('active');
        chordStep.classList.remove('active');
        noteRangeStep.classList.remove('active');
        positionStepChords.classList.remove('active');
    }

    // Optional: Close overlay when clicking outside the content
    overlayMenuChords.addEventListener('click', function(event) {
        if (event.target === overlayMenuChords) {
            console.log('Overlay background clicked');  // Debugging message
            overlayMenuChords.style.display = 'none';
            resetStepsChords();
        }
    });
});
