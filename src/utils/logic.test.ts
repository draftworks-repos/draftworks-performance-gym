import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getVisibleCardCount,
  getMaxCarouselIndex,
  stepCarouselIndex,
  clampSliderPercentage,
  validateEnquiryForm,
  formatInrPrice,
} from './logic';

test('getVisibleCardCount returns 3 on desktop, 2 on tablet, 1 on mobile', () => {
  assert.equal(getVisibleCardCount(1440, 3), 3);
  assert.equal(getVisibleCardCount(1024, 3), 3);
  assert.equal(getVisibleCardCount(768, 3), 2);
  assert.equal(getVisibleCardCount(390, 3), 1);
});

test('stepCarouselIndex clamps within bounds without overflowing', () => {
  assert.equal(getMaxCarouselIndex(5, 3), 2);
  assert.equal(stepCarouselIndex(0, 'prev', 5, 3), 0);
  assert.equal(stepCarouselIndex(0, 'next', 5, 3), 1);
  assert.equal(stepCarouselIndex(2, 'next', 5, 3), 2);
});

test('clampSliderPercentage restricts divider position between 5% and 95%', () => {
  assert.equal(clampSliderPercentage(-15), 5);
  assert.equal(clampSliderPercentage(50), 50);
  assert.equal(clampSliderPercentage(99.4), 95);
});

test('validateEnquiryForm rejects empty or invalid inputs and accepts valid Indian phone numbers', () => {
  const emptyResult = validateEnquiryForm({
    name: '',
    phone: '',
    program: '',
    branch: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.phone);
  assert.ok(emptyResult.errors.program);
  assert.ok(emptyResult.errors.branch);

  const invalidPhone = validateEnquiryForm({
    name: 'Vikram Rao',
    phone: '12345',
    program: 'Barbell Strength & Powerlifting',
    branch: 'Indiranagar, Bengaluru',
  });
  assert.equal(invalidPhone.isValid, false);
  assert.ok(invalidPhone.errors.phone);

  const validResult = validateEnquiryForm({
    name: 'Arjun Mehta',
    phone: '+91 98450 11223',
    program: 'Barbell Strength & Powerlifting',
    branch: 'Indiranagar, Bengaluru',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('formatInrPrice formats INR amounts with Indian comma grouping', () => {
  assert.equal(formatInrPrice(8500), '₹8,500');
  assert.equal(formatInrPrice(22500), '₹22,500');
  assert.equal(formatInrPrice(74000), '₹74,000');
});
