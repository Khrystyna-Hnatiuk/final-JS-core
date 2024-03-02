$(document).ready(function () {


    // пазл рандом
    randomizePuzzle();

    function randomizePuzzle() {
        let blocks = $('.block');
        let container = $('.image-container');

        blocks.detach().sort(function () { return Math.round(Math.random()) - 0.5; });

        container.empty();
        container.append(blocks);
    }

    let timerStarted = false;
    let check = true;
    //функція перевірки складення пазлу
    function checkPuzzle() {

        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        //при перевірці час зупиняється
        clearInterval(countdown);
        for (let i = 0; i < $('#end .bl').length; i++) {
            if ($('#end .bl').eq(i).text() != numbers[i]) {
                check = false;
                break
            }
        }
        if (check) {
            $('.modal-plus').css('display', 'block')
            $('.modal-minus').css('display', 'none')

        }
        else {
            $('.modal-minus').css('display', 'block')
            $('.modal-plus').css('display', 'none')

        }

        $('#check-btn').prop('disabled', true)
        $('#check-btn').css('background-color', ' rgb(255, 164, 164)')

    }

    //закривання модальних вікон
    $('.modal-plus').on('click', function () {
        $(this).css('display', 'none')
    })
    $('.modal-minus').on('click', function () {
        $(this).css('display', 'none')
    })


    //click на check
    $('#check-btn').on('click', function () {
        $('.sure').css('display', 'block')
        

        $('.sure-check').css('display', 'block')
        $('.close-btn').css('display', 'block')

        $('.close-btn').on('click', function () {
            $('.sure').css('display', 'none')
            $('.sure-check').css('display', 'none')
            $('.close-btn').css('display', 'none')
        })

    })

    $('.sure-check').on('click', function () {
        checkPuzzle()
        $('.sure').css('display', 'none')
        $('.sure-check').css('display', 'none')
        $('.close-btn').css('display', 'none')
    })



    //click на start
    $('#start-btn').on('click', function () {
        $(this).css('background-color', ' rgb(255, 164, 164)')
        $(this).prop('disabled', true);
        timerStarted = true;
        countdown = timedown();
        $('#check-btn').prop('disabled', false)
        $('#check-btn').css('background-color', 'rgb(247, 68, 68)')
    })


    let countdown;
    let formattedSeconds;
    //функція зворотнього відліку
    function timedown() {
        var seconds = 59; // початкове значення секунд

        function updateTimer() {
            formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
            $('h2').text('00:' + formattedSeconds);
            $('.sure').text('You still have time, are you sure? 00:' + formattedSeconds);
        }


        return setInterval(function () {
            updateTimer();
            seconds--;

            if (seconds < 0) {
                checkPuzzle();
            }
        }, 1000);

    }
    //Функція нової гри
    function resetGame() {
        clearInterval(countdown);
        formattedSeconds = '00';
        $('h2').text('00:00');
    }

    $('#new-btn').on('click', function () {
        randomizePuzzle();
        resetGame();
        $('#start-btn').css('background-color', 'rgb(247, 68, 68)')
        $('#start-btn').prop('disabled', false);
        $('#check-btn').prop('disabled', true)
        $('#check-btn').css('background-color', ' rgb(255, 164, 164)')
    })

  
    $('.image-container,.bl').sortable({
        connectWith: '.image-container, .bl',
                update: function (event, ui) {
            if (!timerStarted) {
                countdown = timedown();
                timerStarted = true;
                $('#start-btn').css('background-color', ' rgb(255, 164, 164)')
            }
        },
    });
    
   
  
})

