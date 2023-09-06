export default function ({ name, unsubscribe_url }) {
   return `<p>Regards, ${name}.</p>
											</td>
										</tr>
									</table>
								</div>
								<!-- /content -->
							</td>
							<td></td>
						</tr>
					</table>
					<!-- /body -->
				</td>
			</tr>
		</table>
	</body>
	<!-- footer -->
					<table
						class="footer-wrap"
						cellpadding="0"
						cellspacing="0"
						border="0"
						align="center"
					>
						<tr>
							<td></td>
							<td class="container">
								<!-- content -->
								<div class="content">
									<table>
										<tr>
											<td align="center" valign="top">
												<p>
													Don't like these emails?
													<a href=${unsubscribe_url}
														><unsubscribe
															>Unsubscribe</unsubscribe
														></a
													>.
												</p>
											</td>
										</tr>
									</table>
								</div>
								<!-- /content -->
							</td>
							<td></td>
						</tr>
					</table>
					<!-- /footer -->
				</td>
			</tr>
		</table>
	</body>
</html>
`
}
