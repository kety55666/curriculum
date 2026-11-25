(function() {
					var studiesVisual = document.querySelector('#formacion-academica .studies-visual');

					studiesVisual.addEventListener('pointermove', function(event) {
						if (event.pointerType === 'touch')
							return;

						var bounds = studiesVisual.getBoundingClientRect();
						var x = ((event.clientX - bounds.left) / bounds.width) * 100;
						var y = ((event.clientY - bounds.top) / bounds.height) * 100;

						studiesVisual.style.setProperty('--studies-light-x', x + '%');
						studiesVisual.style.setProperty('--studies-light-y', y + '%');
					});
				})();
			

				(function() {
					var aboutCard = document.querySelector('#top .profile-about');

					aboutCard.addEventListener('pointermove', function(event) {
						if (event.pointerType === 'touch')
							return;

						var bounds = aboutCard.getBoundingClientRect();
						var x = ((event.clientX - bounds.left) / bounds.width) * 100;
						var y = ((event.clientY - bounds.top) / bounds.height) * 100;

						aboutCard.style.setProperty('--about-light-x', x + '%');
						aboutCard.style.setProperty('--about-light-y', y + '%');
					});
				})();
			

				(function() {
					var projectSection = document.getElementById('proyectos');
					var projectCards = projectSection.querySelectorAll('.project-card');
					var projectDialog = document.getElementById('project-dialog');
					var dialogTitle = document.getElementById('project-dialog-title');
					var dialogDescription = document.getElementById('project-dialog-description');
					var closeTimer;

					projectSection.classList.add('js-projects');

					function closeProjectDialog() {
						if (!projectDialog.open || projectDialog.classList.contains('is-closing'))
							return;

						projectDialog.classList.add('is-closing');
						closeTimer = window.setTimeout(function() {
							projectDialog.close();
							projectDialog.classList.remove('is-closing');
						}, 200);
					}

					if ('IntersectionObserver' in window) {
						var projectObserver = new IntersectionObserver(function(entries, observer) {
							entries.forEach(function(entry) {
								if (entry.isIntersecting) {
									entry.target.classList.add('is-visible');
									observer.unobserve(entry.target);
								}
							});
						}, { threshold: 0.15 });

						projectCards.forEach(function(card, index) {
							card.style.setProperty('--project-delay', (index * 120) + 'ms');
							projectObserver.observe(card);
						});
					} else {
						projectCards.forEach(function(card) {
							card.classList.add('is-visible');
						});
					}

					projectSection.addEventListener('click', function(event) {
						var detailsButton = event.target.closest('.project-details-button');

						if (detailsButton) {
							window.clearTimeout(closeTimer);
							dialogTitle.textContent = detailsButton.getAttribute('data-project-title');
							dialogDescription.textContent = detailsButton.getAttribute('data-project-description');
							projectDialog.classList.remove('is-closing');
							projectDialog.showModal();
						}
					});

					projectDialog.querySelector('.dialog-close').addEventListener('click', closeProjectDialog);
					projectDialog.addEventListener('click', function(event) {
						if (event.target === projectDialog)
							closeProjectDialog();
					});
					projectDialog.addEventListener('cancel', function(event) {
						event.preventDefault();
						closeProjectDialog();
					});
				})();
			

				(function() {
					var contactSection = document.getElementById('contact');

					contactSection.addEventListener('pointermove', function(event) {
						if (event.pointerType === 'touch')
							return;

						var bounds = contactSection.getBoundingClientRect();
						var x = ((event.clientX - bounds.left) / bounds.width) * 100;
						var y = ((event.clientY - bounds.top) / bounds.height) * 100;

						contactSection.style.setProperty('--contact-light-x', x + '%');
						contactSection.style.setProperty('--contact-light-y', y + '%');
					});
				})();
			

				(function() {
					var cards = document.querySelectorAll('#formacion-profesional .flip-card');

					cards.forEach(function(card) {
						function toggleCard() {
							var flipped = card.classList.toggle('is-flipped');
							card.setAttribute('aria-pressed', String(flipped));
						}

						card.addEventListener('click', toggleCard);
						card.addEventListener('keydown', function(event) {
							if (event.key === 'Enter' || event.key === ' ') {
								event.preventDefault();
								toggleCard();
							}
						});
					});
				})();
			

				(function() {
					var hero = document.getElementById('inicio');
					var lightX = -1000;
					var lightY = -1000;
					var targetX = lightX;
					var targetY = lightY;
					var animationFrame = null;

					function animateLight() {
						lightX += (targetX - lightX) * 0.18;
						lightY += (targetY - lightY) * 0.18;
						hero.style.setProperty('--light-x', lightX + 'px');
						hero.style.setProperty('--light-y', lightY + 'px');

						if (Math.abs(targetX - lightX) > 0.5 || Math.abs(targetY - lightY) > 0.5) {
							animationFrame = window.requestAnimationFrame(animateLight);
						} else {
							lightX = targetX;
							lightY = targetY;
							hero.style.setProperty('--light-x', lightX + 'px');
							hero.style.setProperty('--light-y', lightY + 'px');
							animationFrame = null;
						}
					}

					function moveLight(x, y) {
						targetX = x;
						targetY = y;

						if (animationFrame === null)
							animationFrame = window.requestAnimationFrame(animateLight);
					}

					hero.addEventListener('pointermove', function(event) {
						if (event.pointerType === 'touch')
							return;

						var bounds = hero.getBoundingClientRect();
						moveLight(event.clientX - bounds.left, event.clientY - bounds.top);
					});

					hero.addEventListener('pointerleave', function() {
						moveLight(-1000, -1000);
					});
				})();
			

				(function() {
					var skillSection = document.getElementById('habilidades');
					var skillCards = skillSection.querySelectorAll('.skill-card');
					skillSection.classList.add('js-skills');

					if ('IntersectionObserver' in window) {
						var skillObserver = new IntersectionObserver(function(entries, observer) {
							entries.forEach(function(entry) {
								if (entry.isIntersecting) {
									entry.target.classList.add('is-visible');
									observer.unobserve(entry.target);
								}
							});
						}, { threshold: 0.25 });

						skillCards.forEach(function(card, index) {
							card.style.transitionDelay = (index * 100) + 'ms';
							card.querySelector('.skill-meter-fill').style.transitionDelay = (index * 100) + 'ms';
							skillObserver.observe(card);
						});
					} else {
						skillCards.forEach(function(card) {
							card.classList.add('is-visible');
						});
					}
				})();
