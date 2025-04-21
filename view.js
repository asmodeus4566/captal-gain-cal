// Capital Gains Calculator

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const amountInvestedInput = document.getElementById('amount-invested');
    const amountReceivedInput = document.getElementById('amount-received');
    const timeInvestedInput = document.getElementById('time-invested');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalGainElement = document.getElementById('total-gain');
    const capitalGainsElement = document.getElementById('capital-gains');
    const netProfitElement = document.getElementById('net-profit');
    const resultContainer = document.getElementById('result-container');

    // Add event listener to the calculate button
    calculateBtn.addEventListener('click', calculateCapitalGains);

    // Add event listeners for Enter key on inputs
    const inputs = [amountInvestedInput, amountReceivedInput, timeInvestedInput];
    inputs.forEach(input => {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                calculateCapitalGains();
            }
        });
    });

    // Format currency function
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Calculate capital gains
    function calculateCapitalGains() {
        // Get input values
        const amountInvested = parseFloat(amountInvestedInput.value) || 0;
        const amountReceived = parseFloat(amountReceivedInput.value) || 0;
        const timeInvested = parseFloat(timeInvestedInput.value) || 0;
        
        // Validate inputs
        if (amountInvested <= 0 || amountReceived <= 0 || timeInvested <= 0) {
            showError("Please enter positive values for all fields");
            return;
        }
        
        // Calculate total gain
        const totalGain = amountReceived - amountInvested;
        
        // Calculate capital gains tax based on the specified logic
        let capitalGainsTax = 0;
        
        if (timeInvested < 2) {
            // Short-term capital gains (20%)
            capitalGainsTax = 0.20 * totalGain;
        } else {
            // Long-term capital gains
            if (totalGain > 125000) {
                // If gains > 1.25L, apply 12.5% tax
                capitalGainsTax = 0.125 * totalGain;
            }
            // If gains <= 1.25L, tax remains 0
        }
        
        // Calculate net profit
        const netProfit = totalGain - capitalGainsTax;
        
        // Display results
        totalGainElement.textContent = formatCurrency(totalGain);
        capitalGainsElement.textContent = formatCurrency(capitalGainsTax);
        netProfitElement.textContent = formatCurrency(netProfit);
        
        // Highlight results section with animation
        resultContainer.style.opacity = '0.5';
        setTimeout(() => {
            resultContainer.style.opacity = '1';
        }, 100);
    }
    
    // Show error message
    function showError(message) {
        alert(message);
    }
});
