function initializeOverlayMenuChords() {
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

    // Function to get URL parameter value
    function getUrlParam(paramName, defaultValue) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(paramName) || defaultValue;
    }

    // Default URL parameters
    let urlParams = {
        models_select: getUrlParam('models_select', '3'),
        root: getUrlParam('root', '1'),
        type_options_select: getUrlParam('type_options_select', 'Triads'),
        chords_options_select: getUrlParam('chords_options_select', 'Major'),
        note_range: getUrlParam('note_range', 'e - g'),
        position_select: getUrlParam('position_select', 'Basic Position')
    };

    // Ensure the overlay menu is hidden initially
    if (overlayMenuChords) overlayMenuChords.style.display = 'none';

    if (overlayToggleChords) {
        overlayToggleChords.addEventListener('click', function() {
            if (overlayMenuChords) {
                overlayMenuChords.style.display = 'flex';
                if (initialStepChords) initialStepChords.classList.add('active');
            }
        });
    }

    if (closeOverlayChords) {
        closeOverlayChords.addEventListener('click', function() {
            if (overlayMenuChords) overlayMenuChords.style.display = 'none';
            resetStepsChords();
        });
    }

    if (selectRootNoteChords) {
        selectRootNoteChords.addEventListener('click', function() {
            if (initialStepChords) initialStepChords.classList.remove('active');
            if (rootStepChords) rootStepChords.classList.add('active');
        });
    }

    if (selectTypeChords) {
        selectTypeChords.addEventListener('click', function() {
            if (initialStepChords) initialStepChords.classList.remove('active');
            if (typeStepChords) typeStepChords.classList.add('active');
        });
    }

    if (selectChord) {
        selectChord.addEventListener('click', function() {
            if (initialStepChords) initialStepChords.classList.remove('active');
            if (chordStep) chordStep.classList.add('active');
        });
    }

    if (selectNoteRange) {
        selectNoteRange.addEventListener('click', function() {
            if (initialStepChords) initialStepChords.classList.remove('active');
            if (noteRangeStep) noteRangeStep.classList.add('active');
        });
    }

    if (selectPositionChords) {
        selectPositionChords.addEventListener('click', function() {
            if (initialStepChords) initialStepChords.classList.remove('active');
            if (positionStepChords) positionStepChords.classList.add('active');
        });
    }

    if (backToInitialFromRootChords) {
        backToInitialFromRootChords.addEventListener('click', function() {
            if (rootStepChords) rootStepChords.classList.remove('active');
            if (initialStepChords) initialStepChords.classList.add('active');
        });
    }

    if (backToInitialFromTypeChords) {
        backToInitialFromTypeChords.addEventListener('click', function() {
            if (typeStepChords) typeStepChords.classList.remove('active');
            if (initialStepChords) initialStepChords.classList.add('active');
        });
    }

    if (backToInitialFromChord) {
        backToInitialFromChord.addEventListener('click', function() {
            if (chordStep) chordStep.classList.remove('active');
            if (initialStepChords) initialStepChords.classList.add('active');
        });
    }

    if (backToInitialFromNoteRange) {
        backToInitialFromNoteRange.addEventListener('click', function() {
            if (noteRangeStep) noteRangeStep.classList.remove('active');
            if (initialStepChords) initialStepChords.classList.add('active');
        });
    }

    if (backToInitialFromPositionChords) {
        backToInitialFromPositionChords.addEventListener('click', function() {
            if (positionStepChords) positionStepChords.classList.remove('active');
            if (initialStepChords) initialStepChords.classList.add('active');
        });
    }

    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const step = this.closest('.step').id;

            // Update URL parameters based on the step
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
        const queryParams = new URLSearchParams(urlParams).toString();
        window.location.href = '?' + queryParams;
    }

    function resetStepsChords() {
        if (initialStepChords) initialStepChords.classList.remove('active');
        if (rootStepChords) rootStepChords.classList.remove('active');
        if (typeStepChords) typeStepChords.classList.remove('active');
        if (chordStep) chordStep.classList.remove('active');
        if (noteRangeStep) noteRangeStep.classList.remove('active');
        if (positionStepChords) positionStepChords.classList.remove('active');
    }

    // Optional: Close overlay when clicking outside the content
    if (overlayMenuChords) {
        overlayMenuChords.addEventListener('click', function(event) {
            if (event.target === overlayMenuChords) {
                overlayMenuChords.style.display = 'none';
                resetStepsChords();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeOverlayMenuChords();
});